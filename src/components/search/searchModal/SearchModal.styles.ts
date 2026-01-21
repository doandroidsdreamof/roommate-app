import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(72, 72, 72, 0.8)',
    },
    modalContent: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingTop: spacing.md,
      paddingHorizontal: spacing.md,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.xxl,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      marginBottom: spacing.lg,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    searchIcon: {
      marginRight: spacing.sm,
    },
    searchInput: {
      flex: 1,
      height: 56,
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    selectedLocationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: 20,
      gap: spacing.sm,
      marginBottom: spacing.md,
      alignSelf: 'flex-start',
    },
    selectedLocationText: {
      fontSize: 14,
      color: theme.colors.onPrimaryContainer,
      fontWeight: '500',
      flex: 1,
    },
    sectionLabel: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.md,
      marginTop: spacing.sm,
      fontWeight: '600',
    },
    destinationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      gap: spacing.md,
    },
    destinationIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },
    destinationContent: {
      flex: 1,
    },
    destinationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    destinationSubtitle: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
    filterSection: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 16,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.md,
    },
    filterHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    filterValue: {
      fontSize: 16,
      color: theme.colors.onSurface,
    },
    filterExpandedContent: {
      marginTop: spacing.lg,
      paddingTop: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
    },
    filterPlaceholder: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      fontStyle: 'italic',
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surface,
      marginBottom: '10%',
    },
    clearButton: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
      textDecorationLine: 'underline',
    },
    searchButton: {
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      borderRadius: 8,
      gap: spacing.sm,
    },
    searchButtonText: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    closeButton: {
      marginTop: spacing.md,
      borderColor: theme.colors.outline,
    },
  });
