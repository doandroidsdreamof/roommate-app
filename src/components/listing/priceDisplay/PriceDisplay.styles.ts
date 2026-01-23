import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  price: {
    fontWeight: '700',
  },
});
