import { spacing } from '@/theme/theme';
import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    ageLabel: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
    button: {
      flex: 1,
    },
    dropdown: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
      borderRadius: 8,
      borderWidth: 1,
      elevation: 4,
      left: 0,
      maxHeight: 300,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      top: 60,
      zIndex: 1000,
    },
    dropdownItem: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
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
    input: {
      backgroundColor: theme.colors.surface,
    },
  });
