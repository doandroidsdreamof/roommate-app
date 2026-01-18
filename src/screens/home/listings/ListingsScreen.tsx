import { PostingItem } from '@/api/postingApi';
import ListingCard from '@/components/listing/listingCard/ListingCard';
import Loading from '@/components/loading/Loading';
import Map from '@/components/location/map/Map';
import type { MapMarker } from '@/components/location/map/types';
import { useInfiniteListing } from '@/hooks/useInfiniteListing';
import { HomeStackParamList } from '@/navigation/HomeStackNavigator';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { createStyles } from './ListingsScreen.styles';

type ListingsScreenRouteProp = RouteProp<HomeStackParamList, 'Listings'>;
type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const ListingsScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ListingsScreenRouteProp>();

  const { title, params } = route.params;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteListing(params);

  const listings = data?.pages.flatMap((page) => page.lists) ?? [];


  const markers: MapMarker[] = useMemo(
    () =>
      listings.map((listing) => ({
        id: listing.id,
        position: {
          latitude: parseFloat(listing.latitude),
          longitude: parseFloat(listing.longitude),
        },
        title: `${listing.city} - ${listing.district}`,
        icon: '🏠',
      })),
    [listings]
  );

  // Calculate center point for map
  const mapCenter = useMemo(() => {
    if (listings.length === 0) return undefined;

    const sumLat = listings.reduce(
      (sum, listing) => sum + parseFloat(listing.latitude),
      0
    );
    const sumLng = listings.reduce(
      (sum, listing) => sum + parseFloat(listing.longitude),
      0
    );

    return {
      latitude: sumLat / listings.length,
      longitude: sumLng / listings.length,
    };
  }, [listings]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePostingPress = useCallback(
    (postingId: string) => {
      navigation.navigate('PostingDetail', { postingId });
    },
    [navigation]
  );

  const handleMarkerPress = useCallback(
    (postingId: string) => {
      navigation.navigate('PostingDetail', { postingId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: PostingItem }) => (
      <ListingCard
        listing={item}
        isBookmarked={item.isBookmarked}
        onPress={handlePostingPress}
      />
    ),
    [handlePostingPress]
  );

  // Map header component
  const ListHeaderComponent = useCallback(() => {
    if (listings.length === 0) return null;

    return (
      <View style={styles.mapContainer}>
        <Map
          initialLocation={mapCenter}
          markers={markers}
          onMarkerPress={handleMarkerPress}
          showUserLocation={false}
        />
      </View>
    );
  }, [
    listings.length,
    mapCenter,
    markers,
    handleMarkerPress,
    styles.mapContainer,
  ]);

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

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <ListHeaderComponent />
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
      />
    </View>
  );
};

export default ListingsScreen;
