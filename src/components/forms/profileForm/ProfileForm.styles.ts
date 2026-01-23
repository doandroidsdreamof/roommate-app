import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      marginTop: spacing.md,
    },
    cityContainer: {
      gap: spacing.xs,
    },
    districtContainer: {
      gap: spacing.xs,
    },
    formContainer: {
      gap: spacing.lg,
      height: '100%',
      justifyContent: 'center',
      padding: spacing.md,
      width: '100%',
    },
    genderChip: {
      flex: 1,
      minWidth: 80,
    },
    genderChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },

    header: {
      marginBottom: spacing.xl,
    },
    input: {
      backgroundColor: theme.colors.surface,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.sm,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingBottom: spacing.xl,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
    },
    title: {
      color: theme.colors.onBackground,
      marginBottom: spacing.sm,
    },
  });
