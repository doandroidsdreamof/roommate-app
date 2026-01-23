import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    filterExpandedContent: {
      borderTopColor: theme.colors.outlineVariant,
      borderTopWidth: 1,
      marginTop: spacing.lg,
      paddingTop: spacing.lg,
    },
    filterHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    filterPlaceholder: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
      fontStyle: 'italic',
    },
    filterSection: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 16,
      marginTop: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    },
    filterTitle: {
      color: theme.colors.onSurface,
      fontSize: 18,
      fontWeight: '600',
    },
    filterValue: {
      color: theme.colors.onSurface,
      fontSize: 16,
    },
  });
