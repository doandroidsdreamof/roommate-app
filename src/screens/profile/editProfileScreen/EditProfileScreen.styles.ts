import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    avatarSection: {
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    avatarWrapper: {
      position: 'relative',
    },
    button: {
      marginTop: spacing.lg,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      height: '100%',
      justifyContent: 'center',
    },
    editIcon: {
      backgroundColor: 'transparent',
    },

    editIconBadge: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      bottom: 0,
      padding: spacing.xs,
      position: 'absolute',
      right: 0,
    },
    formContainer: {
      gap: spacing.md,
    },
    header: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },

    photoError: {
      color: theme.colors.error,
      marginTop: spacing.xs,
    },
    scrollContent: {
      margin: 'auto',
      minWidth: '100%',
      padding: spacing.md,
    },
    title: {
      color: theme.colors.onBackground,
      marginBottom: spacing.sm,
    },
  });
