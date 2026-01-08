import { spacing, typography } from '@/theme/theme';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  button: {
    marginTop: spacing.sm,
  },
  container: {
    padding: spacing.md,
  },
  error: {
    ...typography.caption,
    color: '#EF4444',
    marginTop: spacing.xs,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  otpInput: {
    borderColor: '#3ECF8E',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    height: 56,
    textAlign: 'center',
  },
  otpInputError: {
    borderColor: '#EF4444',
  },
  resendButton: {
    marginTop: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: '#666',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
});
