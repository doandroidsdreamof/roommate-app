import { useLocation } from '@/hooks/useLocation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useMemo } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { createStyles } from './LocationPicker.styles';

export interface LocationData {
  province?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
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

  const { handleLocation, isLoading } = useLocation({
    lastKnownMaxAge: 300000, // 5 minutes
    requiredAccuracy: 1000,
    fallbackAccuracy: Location.Accuracy.Low,
    timeInterval: 5000,
    distanceInterval: 0,
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleLocation(Alert.alert, onLocationSelect)}
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
