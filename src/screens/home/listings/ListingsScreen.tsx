import { PostingItem } from '@/api/postingApi';
import ListingCard from '@/components/listing/listingCard/ListingCard';
import Map from '@/components/location/map/Map';
import type { MapMarker } from '@/components/location/map/types';
import Loading from '@/components/primitives/loading/Loading';
import { useInfiniteListing } from '@/hooks/useInfiniteListing';
import { HomeStackParamList } from '@/navigation/HomeStackNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  View,
} from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { createStyles } from './ListingsScreen.styles';

type ListingsScreenRouteProp = RouteProp<HomeStackParamList, 'Listings'>;
type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ListingsScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ListingsScreenRouteProp>();
  const headerHeight = useRef(0);

  const { title, params } = route.params;

  const INITIAL_POSITION = SCREEN_HEIGHT * 0.4;
  const EXPANDED_POSITION = SCREEN_HEIGHT * 0.12;

  const sheetY = useRef(new Animated.Value(INITIAL_POSITION)).current;
  const currentPosition = useRef(INITIAL_POSITION);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 10,
      onPanResponderRelease: () => {
        const targetPosition =
          currentPosition.current === INITIAL_POSITION
            ? EXPANDED_POSITION
            : INITIAL_POSITION;

        currentPosition.current = targetPosition;

        Animated.spring(sheetY, {
          toValue: targetPosition,
          useNativeDriver: false,
          bounciness: 4,
        }).start();
      },
    })
  ).current;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteListing(params);

  const listings = data?.pages.flatMap((page) => page.lists) ?? [];

  const markers: MapMarker[] = listings.map((listing) => ({
    id: listing.id,
    position: {
      latitude: parseFloat(listing.latitude),
      longitude: parseFloat(listing.longitude),
    },
    title: `${listing.city} - ${listing.district}`,
    icon: '🏠',
  }));

  const mapCenter =
    listings.length === 0
      ? undefined
      : {
          latitude:
            listings.reduce((sum, l) => sum + parseFloat(l.latitude), 0) /
            listings.length,
          longitude:
            listings.reduce((sum, l) => sum + parseFloat(l.longitude), 0) /
            listings.length,
        };

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePostingPress = useCallback(
    (postingId: string) => navigation.navigate('PostingDetail', { postingId }),
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: PostingItem }) => (
      <ListingCard listing={item} onPress={handlePostingPress} />
    ),
    [handlePostingPress]
  );

  const keyExtractor = useCallback((item: PostingItem) => item.id, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={title} />
        </Appbar.Header>
        <View style={styles.centerContent}>
          <Loading size="large" />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={title} />
        </Appbar.Header>
        <View style={styles.centerContent}>
          <Text variant="bodyLarge">Bir hata oluştu</Text>
        </View>
      </View>
    );
  }

  const SHEET_HEIGHT = SCREEN_HEIGHT - headerHeight.current;

  return (
    <View style={styles.container}>
      <Appbar.Header
        onLayout={(e) => {
          headerHeight.current = e.nativeEvent.layout.height;
        }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
      </Appbar.Header>

      <View style={styles.mapContainer}>
        <Map
          initialLocation={mapCenter}
          markers={markers}
          onMarkerPress={handlePostingPress}
          showUserLocation={false}
        />
      </View>

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY: sheetY }],
            height: SHEET_HEIGHT,
          },
        ]}
      >
        <View style={styles.dragHandle} {...panResponder.panHandlers}>
          <View style={styles.dragIndicator} />
        </View>

        <FlatList
          data={listings}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text variant="headlineSmall" style={styles.emptyTitle}>
                İlan bulunamadı
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtitle}>
                Bu kategoride henüz ilan bulunmamaktadır
              </Text>
            </View>
          }
          contentContainerStyle={
            listings.length === 0 ? styles.emptyList : styles.listContent
          }
          removeClippedSubviews
          maxToRenderPerBatch={5}
          windowSize={5}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </View>
  );
};

export default ListingsScreen;
