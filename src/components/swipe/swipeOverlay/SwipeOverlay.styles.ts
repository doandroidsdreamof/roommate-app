import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 'auto',
    maxHeight: '15%',
    overflow: 'hidden',
    position: 'relative',
    top: 25,
  },
  likeOverlay: {
    borderColor: '#00A699',
    right: spacing.lg,
    transform: [{ rotate: '20deg' }],
  },
  likeTextColor: {
    color: '#00A699',
  },
  overlayLabel: {
    borderRadius: 8,
    borderWidth: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    position: 'absolute',
  },
  overlayText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  passOverlay: {
    borderColor: '#FFFF00',
    left: spacing.lg,
    transform: [{ rotate: '-20deg' }],
  },
  passTextColor: {
    color: '#FFFF00',
  },
});