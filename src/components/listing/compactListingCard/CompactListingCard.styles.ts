import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { borderRadius, spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bookmarkButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      margin: 0,
      position: 'absolute',
      right: spacing.sm,
      top: spacing.sm,
    },
    container: {
      height: 200,
      marginBottom: spacing.lg,
      paddingBottom: spacing.xxl,
      width: 200,
    },
    content: {
      paddingTop: spacing.sm,
    },
    image: {
      height: '100%',
      objectFit: 'cover',
      width: '100%',
    },
    imageContainer: {
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
      position: 'relative',
    },
    placeholderContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
    },
    price: {
      color: theme.colors.onSurface,
      fontWeight: '600',
    },
    priceLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    priceRow: {
      alignItems: 'baseline',
      flexDirection: 'row',
      marginBottom: 2,
    },
    rating: {
      color: theme.colors.onSurface,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
    title: {
      color: theme.colors.onSurface,
      fontWeight: '600',
      marginBottom: 2,
    },
    viewRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
    },
  });
