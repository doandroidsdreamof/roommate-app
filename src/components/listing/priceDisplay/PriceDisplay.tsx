import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { styles } from './PriceDisplay.styles';

interface PriceDisplayProps {
  amount: number;
  period?: string;
  variant?: 'default' | 'large' | 'small';
  style?: StyleProp<ViewStyle>;
}

const PriceDisplay = ({
  amount,
  period = '/ ay',
  variant = 'default',
  style,
}: PriceDisplayProps) => {
  const theme = useTheme();

  const textVariant =
    variant === 'large'
      ? 'titleLarge'
      : variant === 'small'
        ? 'titleSmall'
        : 'titleMedium';
  const periodVariant = variant === 'large' ? 'bodyMedium' : 'bodySmall';

  return (
    <View style={[styles.container, style]}>
      <Text variant={textVariant} style={styles.price}>
        ₺{amount.toLocaleString('tr-TR')}
      </Text>
      <Text
        variant={periodVariant}
        style={{ color: theme.colors.onSurfaceVariant }}
      >
        {period}
      </Text>
    </View>
  );
};

export default PriceDisplay;
