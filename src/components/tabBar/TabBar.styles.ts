import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      bottom: 0,
      left: 0,
      right: 0,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: spacing.xs,
    },
    tab: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabWrapper: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingTop: spacing.md,
    },
  });
