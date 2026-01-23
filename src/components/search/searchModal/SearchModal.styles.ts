import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bottomBar: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.outlineVariant,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '10%',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    },
    clearButton: {
      color: theme.colors.onSurface,
      fontSize: 16,
      fontWeight: '600',
      textDecorationLine: 'underline',
    },
    closeButton: {
      borderColor: theme.colors.outline,
      marginTop: spacing.md,
    },
    content: {
      paddingBottom: spacing.xxl,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
    },
    destinationContent: {
      flex: 1,
    },
    destinationIconContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      width: 56,
    },
    destinationItem: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.md,
      paddingVertical: spacing.md,
    },
    destinationSubtitle: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
    },
    destinationTitle: {
      color: theme.colors.onSurface,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
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
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      flex: 1,
      paddingTop: spacing.md,
    },
    overlay: {
      backgroundColor: 'rgba(72, 72, 72, 0.8)',
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    searchButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
    },
    searchButtonText: {
      color: theme.colors.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    searchIcon: {
      marginRight: spacing.sm,
    },
    searchInput: {
      color: theme.colors.onSurface,
      flex: 1,
      fontSize: 16,
      height: 56,
    },
    searchInputContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.colors.outline,
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    sectionLabel: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
      fontWeight: '600',
      marginBottom: spacing.md,
      marginTop: spacing.sm,
    },
    selectedLocationContainer: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 20,
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    selectedLocationText: {
      color: theme.colors.onPrimaryContainer,
      flex: 1,
      fontSize: 14,
      fontWeight: '500',
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
    },
  });
