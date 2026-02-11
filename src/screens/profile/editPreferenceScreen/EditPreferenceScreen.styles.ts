import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      marginTop: spacing.md,
    },
    chipGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      marginTop: spacing.xs,
    },
    formContainer: {
      gap: spacing.lg,
    },
    header: {
      backgroundColor: theme.colors.surface,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
    },
    scrollContent: {
      padding: spacing.md,
    },
    section: {
      gap: spacing.sm,
    },
  });
