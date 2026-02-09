import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme.colors.surface,
      marginTop: spacing.xxl
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    emptyContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingVertical: spacing.xl,
    },
    emptySubtext: {
      color: theme.colors.onSurfaceVariant,
      opacity: 0.7,
      textAlign: 'center',
    },
    emptyText: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.sm,
    },
    listContent: {
      paddingBottom: spacing.lg,
    },
    loadingContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingVertical: spacing.xl,
    },
    postingsContainer: {
      flex: 1,
      width: '100%',
    },
    title: {
      fontWeight: '600',
      marginBottom: spacing.md,
      marginTop: spacing.lg,
    },
  });
