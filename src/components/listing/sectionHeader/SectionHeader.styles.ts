import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
    },
    title: {
      fontSize: 22,
      fontWeight: '600',
      color: theme.colors.onSurface,
      letterSpacing: -0.3,
    },
    button: {
      padding: spacing.xs,
    },
  });
