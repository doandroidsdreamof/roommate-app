import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './ScreenText.styles';

interface ScreenTextProps {
  message: string;
  variant?: 'headlineSmall' | 'bodyMedium' | 'titleMedium';
  containerStyle?: StyleProp<ViewStyle>;
}

const ScreenText = ({
  message,
  variant = 'headlineSmall',
  containerStyle,
}: ScreenTextProps) => {
  return (
    <View style={[styles.centered, containerStyle]}>
      <Text variant={variant} style={styles.text}>
        {message}
      </Text>
    </View>
  );
};

export default ScreenText;
