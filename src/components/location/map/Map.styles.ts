import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surfaceVariant,
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
