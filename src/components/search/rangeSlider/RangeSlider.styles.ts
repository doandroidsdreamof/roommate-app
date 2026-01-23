import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    marker: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      height: 24,
      width: 24,
    },
    pressedMarker: {
      backgroundColor: theme.colors.primary,
      borderRadius: 14,
      height: 28,
      width: 28,
    },
    selectedTrack: {
      backgroundColor: theme.colors.primary,
    },
    sliderContainer: {
      alignSelf: 'center',
    },
    track: {
      borderRadius: 2,
      height: 4,
    },
    unselectedTrack: {
      backgroundColor: theme.colors.surfaceVariant,
    },
  });
