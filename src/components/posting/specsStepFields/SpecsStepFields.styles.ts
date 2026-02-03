import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  ageInput: {
    flex: 1,
  },
  ageMin: {
    flex: 1,
  },
  ageRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  container: {
    gap: spacing.xs,
  },
  input: {
    marginBottom: spacing.sm,
  },
  label: {
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
});
