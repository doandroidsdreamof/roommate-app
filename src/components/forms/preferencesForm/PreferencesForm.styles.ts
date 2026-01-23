import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      marginTop: spacing.md,
    },
    chip: {
      marginVertical: spacing.xs,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    container: {
      gap: spacing.md,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
    markerStyles: {
      backgroundColor: theme.colors.primary,
      height: 24,
      width: 24,
    },
    section: {
      gap: spacing.sm,
    },
    sliderContainer: {
      height: 40,
      paddingHorizontal: spacing.sm,
    },
    sliderTrack: {
      borderRadius: 2,
      height: 4,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.lg,
    },
    title: {
      color: theme.colors.onSurface,
      marginBottom: spacing.xs,
      marginTop: spacing.lg,
    },
  });
