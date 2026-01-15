import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    formContainer: {
      gap: spacing.lg,
      padding: spacing.md,
    },
    input: {
      backgroundColor: theme.colors.surface,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.sm,
    },
    genderChips: {
      flexDirection: 'row',
      gap: spacing.sm,
      flexWrap: 'wrap',
    },
    genderChip: {
      flex: 1,
      minWidth: 80,
    },
    cityContainer: {
      gap: spacing.xs,
    },
    districtContainer: {
      gap: spacing.xs,
    },
    button: {
      marginTop: spacing.md,
    },
  });
