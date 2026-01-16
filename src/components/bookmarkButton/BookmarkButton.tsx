import React from 'react';
import { ViewStyle } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { styles } from './BookmarkButton.styles';

interface BookmarkButtonProps {
  onPress: () => void;
  isBookmarked: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
  size?: number;
  iconColor?: string;
}

const BookmarkButton = ({
  onPress,
  isBookmarked,
  isLoading = false,
  style,
  size = 20,
  iconColor,
}: BookmarkButtonProps) => {
  const theme = useTheme();

  return (
    <IconButton
      icon={isBookmarked ? 'bookmark' : 'bookmark-outline'}
      size={size}
      iconColor={iconColor || theme.colors.onPrimary}
      onPress={onPress}
      disabled={isLoading}
      style={[styles.button, style]}
    />
  );
};

export default BookmarkButton;
