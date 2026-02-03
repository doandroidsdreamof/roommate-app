import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bottomSpacer: {
      height: 20,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
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
    locationText: {
      color: theme.colors.secondary,
      marginLeft: 4,
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
    section: {
      marginTop: spacing.lg,
    },
    sectionTitle: {
      fontWeight: '600',
      marginBottom: spacing.sm,
      paddingLeft: spacing.xs,
    },
    verifiedText: {
      color: theme.colors.primary,
      marginLeft: 4,
    },
  });
