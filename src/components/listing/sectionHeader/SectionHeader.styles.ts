import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: spacing.xs,
      width: "100%"
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: 22,
      fontWeight: '600',
      letterSpacing: -0.3,
    },
  });
