import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './IconWithText.styles';

interface IconWithTextProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string | number;
  iconSize?: number;
  iconColor?: string;
  textVariant?: 'bodySmall' | 'bodyMedium' | 'labelSmall';
  style?: ViewStyle;
}

const IconWithText = ({
  icon,
  text,
  iconSize = 14,
  iconColor,
  textVariant = 'bodySmall',
  style,
}: IconWithTextProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.container, style]}>
      <MaterialCommunityIcons
        name={icon}
        size={iconSize}
        color={iconColor || theme.colors.onSurfaceVariant}
      />
      <Text variant={textVariant} style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

export default IconWithText;
