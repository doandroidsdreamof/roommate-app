import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, View, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ImageWithFallbackProps {
  uri: string | null;
  style: StyleProp<ImageStyle>;
  fallbackIconSize?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const ImageWithFallback = ({
  uri,
  style,
  fallbackIconSize = 48,
  resizeMode = 'cover',
}: ImageWithFallbackProps) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  if (!uri || imageError) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: theme.colors.surfaceVariant,
            justifyContent: 'center',
            alignItems: 'center',
          } as ViewStyle,
        ]}
      >
        <MaterialCommunityIcons
          name="home-outline"
          size={fallbackIconSize}
          color={theme.colors.onSurfaceVariant}
        />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      resizeMode={resizeMode}
      onError={() => setImageError(true)}
    />
  );
};

export default ImageWithFallback;
