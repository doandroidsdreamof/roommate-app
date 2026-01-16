import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { borderRadius, spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      width: 200,
      height: 200,
      paddingBottom: spacing.xxl,
      marginBottom: spacing.lg,
    },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: borderRadius.lg,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    bookmarkButton: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      margin: 0,
    },
    content: {
      paddingTop: spacing.sm,
    },
    title: {
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 2,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      marginBottom: spacing.xs,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: 2,
    },
    price: {
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    priceLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    rating: {
      color: theme.colors.onSurface,
    },
    placeholderContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
