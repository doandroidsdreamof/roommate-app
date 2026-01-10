import { spacing } from '@/theme/theme';
import {
    StyleSheet
} from 'react-native';


export const styles = StyleSheet.create({
  activeCircle: {
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    width: 60,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
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