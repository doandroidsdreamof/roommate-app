import { MD3Theme } from 'react-native-paper';
import { SwiperCardRefType } from 'rn-swiper-list';

interface ActionButton {
  icon: string;
  getColor: (theme: MD3Theme) => string;
  size: number;
  getOnPress: (swiperRef: React.RefObject<SwiperCardRefType | null>) => () => void;
  getDisabled?: (currentIndex: number) => boolean;
}

export const actionButtons: ActionButton[] = [
  {
    icon: 'close',
    getColor: (theme) => theme.colors.error,
    size: 35,
    getOnPress: (swiperRef) => () => swiperRef.current?.swipeRight(),
  },
  {
    icon: 'undo',
    getColor: (theme) => theme.colors.secondary,
    size: 25,
    getOnPress: (swiperRef) => () => swiperRef.current?.swipeBack(),
    getDisabled: (currentIndex) => currentIndex === 0,
  },
  {
    icon: 'heart',
    getColor: (theme) => theme.colors.primary,
    size: 35,
    getOnPress: (swiperRef) => () => swiperRef.current?.swipeLeft(),
  },
];
