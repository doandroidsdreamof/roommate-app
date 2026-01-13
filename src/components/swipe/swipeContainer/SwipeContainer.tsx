import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, useTheme } from 'react-native-paper';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import Loading from '@/components/Loading';
import ScreenText from '@/components/ScreenText';
import SwipeOverlay from '@/components/swipe/SwipeOverlay';
import { useSwipeFeed } from '@/hooks/useSwipeFeed';
import { useSwipeHandlers } from '@/hooks/useSwipeHandlers';
import useSwipeMutations from '@/hooks/useSwipeMutations';
import { FeedItem } from '@/schemas/feedSchema';
import { actionButtons } from '@/screens/swipe/actionButtons';
import SwipeCard from '../swipeCard/SwipeCard';
import { createStyles } from './SwipeContainer.styles';

const OverlayLabelLeft = () => <SwipeOverlay type="LIKE" />;
const OverlayLabelRight = () => <SwipeOverlay type="PASS" />;

interface SwipeContainerProps {
  onMatch: (profile: FeedItem) => void;
}

const SwipeContainer = ({ onMatch }: SwipeContainerProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const swiperRef = useRef<SwiperCardRefType | null>(null);

  const { feed, isLoading, isFetching, currentIndex, handleIndexChange } =
    useSwipeFeed();

  const { handleSwipeLike, handleSwipePass } = useSwipeMutations(feed, onMatch);

  const { handleSwipeRight, handleSwipeLeft } = useSwipeHandlers(
    feed,
    handleSwipeLike,
    handleSwipePass
  );

  const renderCard = useCallback((item: FeedItem) => {
    return <SwipeCard profile={item} />;
  }, []);

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (feed.length === 0 && !isFetching) {
    return <ScreenText message="No more profiles to show" />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Swiper
          ref={swiperRef}
          data={feed}
          renderCard={renderCard}
          cardStyle={styles.cardStyle}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
          OverlayLabelLeft={OverlayLabelLeft}
          OverlayLabelRight={OverlayLabelRight}
          onIndexChange={handleIndexChange}
        />
        {isFetching && <Loading size="small" />}
      </View>

      <View style={styles.buttonContainer}>
        {actionButtons.map((button) => (
          <IconButton
            key={button.icon}
            icon={button.icon}
            iconColor={button.getColor(theme)}
            size={button.size}
            mode="contained"
            style={styles.circleButton}
            disabled={button.getDisabled?.(currentIndex) ?? false}
            onPress={button.getOnPress(swiperRef)}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default SwipeContainer;
