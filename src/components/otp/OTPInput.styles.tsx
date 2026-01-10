import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '@/theme/theme';

export const styles = StyleSheet.create({
  button: {
    marginTop: spacing.lg,
  },
  container: {
    paddingHorizontal: spacing.lg,
  },
  error: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  hiddenInput: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  otpDigitText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  otpInput: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderRadius: borderRadius.md,
    borderWidth: 2,
    height: 56,
    justifyContent: 'center',
    width: 48,
  },
  otpInputActive: {
    borderColor: '#FF5A5F',
    borderWidth: 2,
  },
  otpInputError: {
    borderColor: '#EF4444',
  },
  resendButton: {
    marginTop: spacing.md,
  },
  subtitle: {
    color: '#767676',
    fontSize: 16,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  timerText: {
    color: '#767676',
    fontSize: 14,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.3,
    textAlign: 'center',
  },
});
