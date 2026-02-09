import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      borderColor: theme.colors.outline,
      borderRadius: 20,
      borderWidth: 1,
      height: 40,
      justifyContent: 'center',
      width: 40,
    },
    buttonDisabled: {
      borderColor: theme.colors.surfaceDisabled,
      opacity: 0.5,
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
      gap: 16,
    },
    value: {
      minWidth: 40,
      textAlign: 'center',
    },
  });