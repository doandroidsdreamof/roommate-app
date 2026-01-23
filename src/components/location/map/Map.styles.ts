import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceVariant,
      flex: 1,
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
