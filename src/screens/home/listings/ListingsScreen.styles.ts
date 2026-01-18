import { borderRadius, spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContent: {
      padding: spacing.md,
      gap: spacing.md,
    },
    emptyList: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    emptyTitle: {
      marginBottom: spacing.sm,
      color: theme.colors.onSurfaceVariant,
    },
    emptySubtitle: {
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    mapContainer: {
      height: 300,
      borderRadius: borderRadius.md,
      overflow: 'hidden',
      zIndex: 10,
      width: '90%',
      margin: 'auto',
    },
  });
