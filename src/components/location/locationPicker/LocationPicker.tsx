import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { createStyles } from './LocationPicker.styles';

// TODO custom hook for location
export interface LocationData {
  province?: string;
  district?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData) => void;
  title?: string;
  subtitle?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const LocationPicker = ({
  onLocationSelect,
  title = 'Lokasyon',
  subtitle = 'Çevrenizdeki ilanlar',
  icon = 'map-marker-outline',
}: LocationPickerProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [isLoading, setIsLoading] = useState(false);


  const handlePress = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location access is needed to find nearby listings.'
        );
        setIsLoading(false);
        return;
      }

      // Try cached location first (instant if available)
      let location = await Location.getLastKnownPositionAsync({
        maxAge: 300000,
        requiredAccuracy: 1000,
      });

      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
      }

      const addresses = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];
        const locationData: LocationData = {
          province: address.region || undefined,
          district: address.subregion || address.district || undefined,
        };
        onLocationSelect(locationData);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'Could not get your location. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={isLoading}
    >
      <View style={styles.iconWrapper}>
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={theme.colors.primary}
          />
        )}
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.primaryText}>{title}</Text>
        <Text style={styles.secondaryText}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LocationPicker;
