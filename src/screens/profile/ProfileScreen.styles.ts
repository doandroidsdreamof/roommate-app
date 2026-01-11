import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomSpacer: {
    height: 100,
  },
  container: {
    flex: 1,
  },
  darkModeItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  menuCard: {
    overflow: 'hidden',
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
  profileCard: {
    margin: spacing.md,
    marginTop: spacing.lg,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  profileName: {
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
});
