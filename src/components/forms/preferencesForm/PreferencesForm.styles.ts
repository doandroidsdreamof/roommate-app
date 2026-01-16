import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      gap: spacing.md,
    },
    title: {
      color: theme.colors.onSurface,
      marginBottom: spacing.xs,
      marginTop: spacing.lg,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.lg,
    },
    section: {
      gap: spacing.sm,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
    sliderContainer: {
      height: 40,
      paddingHorizontal: spacing.sm,
    },
    sliderTrack: {
      height: 4,
      borderRadius: 2,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    chip: {
      marginVertical: spacing.xs,
    },
    button: {
      marginTop: spacing.md,
    },
  });
