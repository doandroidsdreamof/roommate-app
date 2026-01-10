import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

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

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default ScreenText;
