import { spacing } from '@/theme/theme';
import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    ageLabel: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
    ageSliderContainer: {
      gap: spacing.sm,
    },

    ageValue: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: '600',
    },
    button: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: spacing.md,
      marginTop: spacing.xl,
    },

    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      marginTop: spacing.xs,
    },
    formContainer: {
      gap: spacing.lg,
    },
    genderChip: {
      flex: 1,
    },
    genderChips: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
  });
