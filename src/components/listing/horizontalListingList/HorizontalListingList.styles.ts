import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    marginRight: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  loadingContainer: {
    alignItems: 'center',
    height: 360,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
});
