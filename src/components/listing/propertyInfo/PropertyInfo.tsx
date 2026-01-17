import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { styles } from './PropertyInfo.styles';

interface PropertyInfoProps {
  roomCount: number;
  bathroomCount: number;
  squareMeters: number;
}

const PropertyInfo = ({
  roomCount,
  bathroomCount,
  squareMeters,
}: PropertyInfoProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <MaterialCommunityIcons
          name="bed"
          size={20}
          color={theme.colors.onSurfaceVariant}
        />
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
          {roomCount} oda
        </Text>
      </View>
      <View style={styles.item}>
        <MaterialCommunityIcons
          name="shower"
          size={20}
          color={theme.colors.onSurfaceVariant}
        />
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
          {bathroomCount} banyo
        </Text>
      </View>
      <View style={styles.item}>
        <MaterialCommunityIcons
          name="texture-box"
          size={20}
          color={theme.colors.onSurfaceVariant}
        />
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
          {squareMeters} m²
        </Text>
      </View>
    </View>
  );
};

export default PropertyInfo;
