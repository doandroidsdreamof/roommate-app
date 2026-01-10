import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '@/theme/theme';

export const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: spacing.sm,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  keepSwipingButton: {
    borderRadius: borderRadius.lg,
  },
  keepSwipingButtonLabel: {
    fontSize: 16,
  },
  locationText: {
    marginBottom: spacing.lg,
    opacity: 0.7,
    textAlign: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    margin: spacing.lg,
    padding: spacing.lg,
  },
  profilesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  sendMessageButton: {
    borderRadius: borderRadius.lg,
    marginBottom: 12,
  },
  sendMessageButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: '500',
    marginBottom: spacing.sm,
    opacity: 0.9,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});
