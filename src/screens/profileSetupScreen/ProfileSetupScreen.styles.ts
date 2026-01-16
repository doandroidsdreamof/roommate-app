import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: spacing.lg,
      paddingTop: spacing.xxl,
    },
    header: {
      marginBottom: spacing.xl,
    },

    subtitle: {
      color: theme.colors.onSurfaceVariant,
    },
    title: {
      color: theme.colors.onBackground,
      marginBottom: spacing.sm,
    },
  });
