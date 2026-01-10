import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loading = ({ size = 'large', color }: LoadingProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color || theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loading;
