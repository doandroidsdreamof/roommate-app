import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    label: {
      marginBottom: 8,
    },
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      borderWidth: 1,
      borderRadius: 20,
      borderColor: theme.colors.outline,
    },
    value: {
      minWidth: 40,
      textAlign: 'center',
    },
  });
