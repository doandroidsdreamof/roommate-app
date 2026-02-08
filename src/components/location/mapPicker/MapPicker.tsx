import { locationApi } from '@/api';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import {
  Button,
  HelperText,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import Map from '../map/Map';
import { createStyles } from './MapPicker.styles';

export interface MapLocation {
  latitude: number;
  longitude: number;
}

interface MapPickerProps {
  value?: MapLocation | null;
  onChange: (location: MapLocation) => void;
  onLocationDataChange?: (locationData: {
    province?: string;
    district?: string;
    neighborhoodId?: number;
  }) => void;
  error?: string;
  label?: string;
}

const DEFAULT_LOCATION = { latitude: 41.0082, longitude: 28.9784 };

const MapPicker = ({
  value,
  onChange,
  onLocationDataChange,
  error,
  label = 'Harita Konumu',
}: MapPickerProps) => {
  const theme = useTheme();
  const styles = createStyles(theme, !!error);

  const [showMap, setShowMap] = useState(false);
  const [tempLocation, setTempLocation] = useState<MapLocation | null>(
    value || null
  );
  const [initialLocation, setInitialLocation] =
    useState<MapLocation>(DEFAULT_LOCATION);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (showMap && !value) {
      void getUserLocation();
    }
  }, [showMap]);

  // TODO code duplication
  const getUserLocation = async () => {
    try {
      setLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Location permission denied');
        setInitialLocation(DEFAULT_LOCATION);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setInitialLocation(userLocation);
      if (!tempLocation) {
        setTempLocation(userLocation);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setInitialLocation(DEFAULT_LOCATION);
    } finally {
      setLocationLoading(false);
    }
  };

  const reverseGeocodeAndFindNeighborhood = async (location: MapLocation) => {
    if (!onLocationDataChange) return;

    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (addresses.length === 0) {
        console.log('No addresses found');
        return;
      }

      const address = addresses[0];
      const provinceName = address.region;
      const districtName = address.subregion || address.district;

      if (!provinceName || !districtName) {
        console.log('Missing province or district from geocoding');
        onLocationDataChange({
          province: provinceName || undefined,
          district: districtName || undefined,
        });
        return;
      }

      try {
        const neighborhoods = await locationApi.searchNeighborhoods({
          query: address.street || address.name || '',
        });

        const matchingNeighborhood = neighborhoods.find(
          (n) =>
            n.city.toLowerCase() === provinceName.toLowerCase() &&
            n.district.toLowerCase() === districtName.toLowerCase()
        );

        if (matchingNeighborhood) {
          onLocationDataChange({
            province: provinceName,
            district: districtName,
            neighborhoodId: parseInt(matchingNeighborhood.id, 10),
          });
        } else {
          onLocationDataChange({
            province: provinceName,
            district: districtName,
          });
        }
      } catch (apiError) {
        console.error('Error searching neighborhoods:', apiError);
        onLocationDataChange({
          province: provinceName,
          district: districtName,
        });
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const handleConfirm = async () => {
    if (tempLocation) {
      onChange(tempLocation);
      await reverseGeocodeAndFindNeighborhood(tempLocation);
      setShowMap(false);
    }
  };

  const handleCancel = () => {
    setTempLocation(value || null);
    setShowMap(false);
  };

  return (
    <View>
      <Text variant="labelLarge" style={styles.label}>
        {label} {!value && '*'}
      </Text>

      {!showMap ? (
        <View>
          <Button
            mode={value ? 'outlined' : 'contained'}
            icon="map-marker"
            onPress={() => setShowMap(true)}
            style={styles.button}
            loading={locationLoading}
          >
            Haritadan Konum Seç
          </Button>
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        </View>
      ) : (
        <Modal
          visible={showMap}
          animationType="slide"
          onRequestClose={handleCancel}
        >
          <View style={styles.fullscreenContainer}>
            <View style={styles.fullscreenHeader}>
              <Text variant="titleMedium" style={styles.headerTitle}>
                Konum Seç
              </Text>
              <IconButton icon="close" size={24} onPress={handleCancel} />
            </View>

            <View style={styles.fullscreenMapContainer}>
              <Map
                initialLocation={tempLocation || initialLocation}
                markers={
                  tempLocation
                    ? [
                        {
                          id: 'selected',
                          position: tempLocation,
                          icon: '📍',
                          title: 'Seçili Konum',
                        },
                      ]
                    : []
                }
                onMapPress={(coords) => setTempLocation(coords)}
                style={styles.map}
                showUserLocation={true}
              />
            </View>

            <View style={styles.actions}>
              <Button
                mode="outlined"
                onPress={handleCancel}
                style={styles.actionButton}
              >
                İptal
              </Button>
              <Button
                mode="contained"
                onPress={handleConfirm}
                disabled={!tempLocation}
                style={styles.actionButton}
              >
                Onayla
              </Button>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MapPicker;