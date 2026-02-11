import { useLocation } from '@/hooks/useLocation';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, View } from 'react-native';
import {
  Button,
  ButtonProps,
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

export interface LocationChange {
  province?: string;
  district?: string;
  neighborhood?: string | null;
}

interface MapPickerProps {
  value?: MapLocation | null;
  buttonType?: ButtonProps['mode'];
  onChange?: (location: MapLocation) => void;
  onLocationDataChange?: (locationData: LocationChange) => void;
  error?: string;
  label?: string;
}

const DEFAULT_LOCATION = { latitude: 41.0082, longitude: 28.9784 };

const MapPicker = ({
  value,
  onChange,
  onLocationDataChange,
  error,
  buttonType,
  label,
}: MapPickerProps) => {
  const theme = useTheme();
  const styles = createStyles(theme, !!error);

  const [showMap, setShowMap] = useState(false);
  const [tempLocation, setTempLocation] = useState<MapLocation | null>(
    value || null
  );
  const [initialLocation, setInitialLocation] =
    useState<MapLocation>(DEFAULT_LOCATION);
  const { fetchRawLocation, checkLocationPermissions, isLoading } = useLocation(
    {
      lastKnownMaxAge: 300000,
      requiredAccuracy: 1000,
      fallbackAccuracy: Location.Accuracy.Balanced,
      timeInterval: 5000,
      distanceInterval: 0,
    }
  );

  const getUserLocation = async () => {
    try {
      const hasPermission = await checkLocationPermissions(Alert.alert);
      if (!hasPermission) {
        setInitialLocation(DEFAULT_LOCATION);
        return;
      }

      const location = await fetchRawLocation();
      if (location) {
        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setInitialLocation(userCoords);
        if (!tempLocation) setTempLocation(userCoords);
      }
    } catch (err) {
      console.error('Error in getUserLocation:', err);
      setInitialLocation(DEFAULT_LOCATION);
    }
  };

  useEffect(() => {
    if (showMap && !value) {
      void getUserLocation();
    }
  }, [showMap, value]);

  // TODO this part is terrible decouple and test it
  const reverseGeocodeAndFindNeighborhood = async (location: MapLocation) => {
    if (!onLocationDataChange) return;

    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      console.log('🚀 ~ addresses==============>:', addresses);

      if (addresses.length === 0) {
        console.log('No addresses found');
        return;
      }

      const address = addresses[0];
      const provinceName = address.region;
      const neighborhood = address.district;
      console.log('🚀 ~ neighborhood:', neighborhood);
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
        if (neighborhood?.length === 0) {
          console.log(' No neighborhoods found for district:', districtName);
          onLocationDataChange({
            province: provinceName,
            district: districtName,
          });
          return;
        }

        console.log('Autopopulated:', provinceName, districtName, neighborhood);

        onLocationDataChange({
          province: provinceName,
          district: districtName,
          neighborhood: neighborhood,
        });
      } catch (apiError) {
        console.error('Error fetching location data:', apiError);
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
      if (onChange) onChange(tempLocation);
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
      {label && (
        <Text variant="labelLarge" style={styles.label}>
          {label} {!value && '*'}
        </Text>
      )}
      {!showMap ? (
        <View>
          <Button
            mode={
              typeof buttonType === 'string'
                ? buttonType
                : value
                  ? 'outlined'
                  : 'contained'
            }
            icon="map-marker"
            onPress={() => setShowMap(true)}
            style={styles.button}
            loading={isLoading}
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
