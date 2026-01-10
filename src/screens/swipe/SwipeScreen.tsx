import { swipeApi } from '@/api';
import { SwipeResponse } from '@/api/swipeApi';
import Loading from '@/components/Loading';
import ScreenText from '@/components/ScreenText';
import SwipeCard from '@/components/swipe/SwipeCard';
import SwipeOverlay from '@/components/swipe/SwipeOverlay';
import useSwipe from '@/hooks/useSwipe';
import { FeedItem } from '@/schemas/feedSchema';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton, useTheme } from 'react-native-paper';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { styles } from './SwipeScreen.styles';

const SwipeScreen = () => {
  const theme = useTheme();
  const swiperRef = useRef<SwiperCardRefType | null>(null);
  const {
    isFetching,
    refetch,
    isLoading,
    data: feed = [],
  } = useQuery<FeedItem[]>({
    queryKey: ['swipe'],
    queryFn: () => swipeApi.getFeed(),
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<SwipeResponse | null>(
    null
  );
  const { handleSwipeLike, handleSwipePass } = useSwipe((matchData) => {
    setMatchedProfile(matchData);
  });

  const renderCard = useCallback((item: FeedItem) => {
    return <SwipeCard profile={item} />;
  }, []);

  const handleSwipeRight = useCallback(
    (cardIndex: number) => {
      const profile = feed[cardIndex];
      if (profile) {
        handleSwipePass(profile.userId);
      }
    },
    [feed, handleSwipePass]
  );

  const handleSwipeLeft = useCallback(
    (cardIndex: number) => {
      const profile = feed[cardIndex];
      if (profile) {
        handleSwipeLike(profile.userId);
      }
    },
    [feed, handleSwipeLike]
  );

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      if (index >= feed.length - 2 && feed.length > 0) {
        void refetch();
      }
    },
    [feed.length, refetch]
  );

  const OverlayLabelLeft = useCallback(() => <SwipeOverlay type="LIKE" />, []);
  const OverlayLabelRight = useCallback(() => <SwipeOverlay type="PASS" />, []);

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (feed.length === 0 && !isFetching) {
    return <ScreenText message="No more profiles to show" />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
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
        <IconButton
          icon="close"
          iconColor={theme.colors.error}
          size={35}
          mode="contained"
          style={styles.circleButton}
          onPress={() => swiperRef.current?.swipeRight()}
        />

        <IconButton
          icon="undo"
          iconColor={theme.colors.secondary}
          size={25}
          mode="contained"
          style={styles.circleButton}
          disabled={currentIndex === 0}
          onPress={() => swiperRef.current?.swipeBack()}
        />

        <IconButton
          icon="heart"
          iconColor={theme.colors.primary}
          size={35}
          mode="contained"
          style={styles.circleButton}
          onPress={() => swiperRef.current?.swipeLeft()}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default SwipeScreen;
