import { containerStyle } from '@/styles/main.style';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loading = ({ size = 'large', color }: LoadingProps) => {
  const theme = useTheme();

  return (
    <View style={containerStyle.container}>
      <ActivityIndicator size={size} color={color || theme.colors.primary} />
    </View>
  );
};

export default Loading;
