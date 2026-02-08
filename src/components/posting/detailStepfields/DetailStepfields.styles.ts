import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  container: {
    gap: spacing.md,
  },
  input: {
    marginBottom: spacing.sm,
  },
  label: {
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
});