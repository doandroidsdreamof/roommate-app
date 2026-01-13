import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    dropdown: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      borderWidth: 1,
      elevation: 8,
      left: 0,
      maxHeight: 200,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      top: 60,
      zIndex: 1000,
    },
    dropdownItem: {
      backgroundColor: theme.colors.surface,
    },
    input: {
      backgroundColor: theme.colors.surface,
    },
  });
