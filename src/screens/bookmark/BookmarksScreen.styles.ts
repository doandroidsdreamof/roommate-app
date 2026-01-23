import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  emptyList: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptySubtitle: {
    opacity: 0.7,
    textAlign: 'center',
  },
  emptyTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
});
