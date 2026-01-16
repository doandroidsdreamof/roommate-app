import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  menuItemLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
