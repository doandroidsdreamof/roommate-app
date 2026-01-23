import { borderRadius, spacing, typography } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    amenitiesRow: {
      flexDirection: 'row',
      gap: spacing.md,
      marginBottom: spacing.sm,
    },
    bookmarkButton: {
      backgroundColor: theme.colors.scrim,
      position: 'absolute',
      right: spacing.sm,
      top: spacing.sm,
    },
    card: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: spacing.md,
      marginVertical: spacing.sm,
    },
    chip: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    chipsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    content: {
      paddingTop: spacing.md,
    },
    footer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: spacing.xs,
    },
    image: {
      borderRadius: borderRadius.lg,
      height: '100%',
      width: '100%',
    },
    imageContainer: {
      height: 200,
      position: 'relative',
    },
    locationRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
      marginBottom: spacing.sm,
    },
    placeholderContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
    },
    priceTag: {
      backgroundColor: theme.colors.primary,
      borderRadius: borderRadius.md,
      bottom: spacing.md,
      left: spacing.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      position: 'absolute',
    },
    statsRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
    },
    textSecondary: {
      ...typography.caption,
      color: theme.colors.onSurfaceVariant,
    },
    title: {
      ...typography.h4,
      color: theme.colors.onSurface,
      marginBottom: spacing.sm,
    },
  });
