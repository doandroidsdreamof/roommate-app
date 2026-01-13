import { Dimensions, StyleSheet } from 'react-native';
import { borderRadius, spacing } from '@/theme/theme';
import { MD3Theme } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.70;

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.xl,
      height: CARD_HEIGHT,
      marginTop: 'auto',
      overflow: 'hidden',
      width: CARD_WIDTH,
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    image: {
      height: '100%',
      objectFit: 'cover',
      width: '100%',
    },
    imageContainer: {
      height: CARD_HEIGHT * 0.65,
      width: '100%',
    },
    infoRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
      marginBottom: spacing.xs,
    },
    infoText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 15,
    },
    name: {
      color: theme.colors.onSurface,
      fontSize: 26,
      fontWeight: '800',
      marginBottom: spacing.sm,
    },
    verifiedBadge: {
      backgroundColor: theme.colors.surface,
      borderRadius: borderRadius.full,
      padding: 6,
      position: 'absolute',
      right: spacing.md,
      top: spacing.md,
    },
  });
