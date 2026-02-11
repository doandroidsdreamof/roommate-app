import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceVariant,
      padding: 10,
    },
    label: {
      color: theme.colors.error,
    },
    title: {
      fontWeight: 'bold',
    },
  });
