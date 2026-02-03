import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './SwipeLimitBanner.styles';

interface SwipeLimitBannerProps {
  error: {
    message: string;
    resetAt: string;
  } | null;
}

const SwipeLimitBanner = ({ error }: SwipeLimitBannerProps) => {
  if (!error) return null;

  const resetDate = new Date(error.resetAt);
  const formattedDate = resetDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      {error.message && (
        <Text variant="headlineSmall" style={styles.message}>
          Günlük kaydırma limitine ulaştınız
        </Text>
      )}
      <Text variant="bodyMedium" style={styles.resetText}>
        {formattedDate} tarihinde tekrar deneyin
      </Text>
    </View>
  );
};

export default SwipeLimitBanner;
