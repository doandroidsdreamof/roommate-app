import { spacing } from '@/theme/theme';
import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      marginTop: spacing.md,
    },
    cityContainer: {
      zIndex: 2,
    },
    districtContainer: {
      zIndex: 1,
    },
    formContainer: {
      gap: spacing.lg,
      paddingBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
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
    keyboardAvoidingView: {
      flex: 1,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  });
