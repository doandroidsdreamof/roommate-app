import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      borderColor: theme.colors.outline,
      borderRadius: 20,
      borderWidth: 1,
    },
    container: {
      alignItems: 'center',
    },
    label: {
      marginBottom: 8,
    },
    stepperContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    value: {
      minWidth: 40,
      textAlign: 'center',
    },
  });
