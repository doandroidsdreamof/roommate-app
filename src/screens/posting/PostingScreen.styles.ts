import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      flex: 1,
    },
    buttonContainer: {
      paddingVertical: spacing.lg,
      width: '100%',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
    },
    modalButtonContainer: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xxl,
      top: 25,
      width: '100%',
    },
    modalContainer: {
      flex: 1,
      height: '100%',
      padding: spacing.sm,
    },
    stepTitle: {
      marginBottom: spacing.lg,
    },
  });
