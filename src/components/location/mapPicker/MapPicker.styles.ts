import { borderRadius, shadows, spacing } from '@/theme/theme';
import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme, hasError: boolean) =>
  StyleSheet.create({
    actionButton: {
      flex: 1,
    },
    actions: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginTop: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    button: {
      borderColor: hasError ? theme.colors.error : theme.colors.outline,
      borderWidth: hasError ? 2 : 1,
      marginBottom: spacing.sm,
    },
    fullscreenButton: {
      backgroundColor: theme.colors.surface,
      position: 'absolute',
      right: spacing.sm,
      top: spacing.sm,
      ...shadows.md,
    },
    fullscreenContainer: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    fullscreenHeader: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: spacing.sm,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
      ...shadows.sm,
    },
    fullscreenMapContainer: {
      flex: 1,
      margin: spacing.md,
    },
    headerTitle: {
      color: theme.colors.onSurface,
    },
    label: {
      color: theme.colors.onSurface,
      marginBottom: spacing.lg,
    },
    map: {
      borderRadius: borderRadius.md,
      flex: 1,
      overflow: 'hidden',
      ...shadows.md,
    },
    mapContainer: {
      height: 400,
      position: 'relative',
    },
  });
