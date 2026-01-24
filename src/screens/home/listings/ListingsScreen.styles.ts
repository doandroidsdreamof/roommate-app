import { borderRadius, spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bottomSheet: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      bottom: 0,
      elevation: 10,
      left: 0,
      maxHeight: '100%',
      position: 'absolute',
      right: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    centerContent: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    dragHandle: {
      alignItems: 'center',
      paddingVertical: spacing.md,
    },
    dragIndicator: {
      backgroundColor: theme.colors.outlineVariant,
      borderRadius: 2,
      height: 4,
      width: 40,
    },
    emptyContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: spacing.xl,
    },
    emptyList: {
      flex: 1,
    },
    emptySubtitle: {
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    emptyTitle: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.sm,
    },
    listContent: {
      gap: spacing.md,
      padding: spacing.md,
      paddingBottom: spacing.xl,
    },
    mapContainer: {
      flex: 1,
    },
  });
