import { borderRadius, spacing, typography } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      marginHorizontal: spacing.md,
      marginVertical: spacing.sm,
      backgroundColor: theme.colors.surface,
    },
    imageContainer: {
      position: 'relative',
      height: 200,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: borderRadius.lg,
    },
    bookmarkButton: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      backgroundColor: theme.colors.scrim + '80',
    },
    priceTag: {
      position: 'absolute',
      bottom: spacing.md,
      left: spacing.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      backgroundColor: theme.colors.primary,
    },
    content: {
      paddingTop: spacing.md,
    },
    title: {
      ...typography.h4,
      color: theme.colors.onSurface,
      marginBottom: spacing.sm,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginBottom: spacing.sm,
    },
    chipsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    chip: {
      height: 28,
      backgroundColor: theme.colors.surfaceVariant,
    },
    amenitiesRow: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.sm,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    textSecondary: {
      ...typography.caption,
      color: theme.colors.onSurfaceVariant,
    },
    placeholderContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
