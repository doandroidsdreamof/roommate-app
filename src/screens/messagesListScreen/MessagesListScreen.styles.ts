import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    emptyContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      padding: spacing.xl,
    },
    emptySubtext: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
      textAlign: 'center',
    },
    emptyText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: spacing.sm,
    },
    listContainer: {
      backgroundColor: theme.colors.background,
      flexGrow: 1,
    },
    separator: {
      backgroundColor: theme.colors.outlineVariant,
      height: 1,
      marginLeft: 72,
    },
  });
