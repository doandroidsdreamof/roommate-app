import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '@/theme/theme';

export const styles = StyleSheet.create({
  backButton: {
    margin: 0,
    marginRight: spacing.sm,
  },
  button: {
    marginTop: spacing.lg,
  },
  container: {
    paddingHorizontal: spacing.lg,
  },
  emailDisplay: {
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'column',
    marginTop: spacing.lg,
  },
  emailText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  error: {
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.md,
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
    borderRadius: borderRadius.md,
    borderWidth: 2,
    height: 56,
    justifyContent: 'center',
    width: 48,
  },
  otpInputActive: {
    borderWidth: 2,
  },
  resendButton: {
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  timerText: {
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
  wrongEmailButton: {
    marginLeft: 0,
    paddingHorizontal: 0,
  },
});