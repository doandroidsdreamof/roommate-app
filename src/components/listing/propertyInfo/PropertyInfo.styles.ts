import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
});