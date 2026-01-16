import { BookmarkItem } from '@/api/bookmarkApi';
import ListingCard from '@/components/listing/listingCard/ListingCard';
import Loading from '@/components/loading/Loading';
import { useInfiniteBookmarks } from '@/hooks/useInfiniteBookmarks';
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { styles } from './BookmarksScreen.styles';

const BookmarksScreen = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteBookmarks();

  const bookmarks = data?.pages.flatMap((page) => page.bookmarks) ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: BookmarkItem }) => (
      <ListingCard listing={item.posting} isBookmarked={true} />
    ),
    []
  );

  const keyExtractor = useCallback((item: BookmarkItem) => item.id, []);

  const renderHeader = () => (
    <Appbar.Header elevated>
      <Appbar.Content title="Kayıtlı İlanlar" />
    </Appbar.Header>
  );

  const renderEmpty = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text variant="headlineSmall" style={styles.emptyTitle}>
          Henüz kayıtlı ilan yok
        </Text>
        <Text variant="bodyMedium" style={styles.emptySubtitle}>
          Beğendiğiniz ilanları kaydederek daha sonra kolayca erişebilirsiniz
        </Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.centerContent}>
          <Loading size="large" />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.centerContent}>
          <Text variant="bodyLarge">Bir hata oluştu</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          bookmarks.length === 0 ? styles.emptyList : styles.listContent
        }
        removeClippedSubviews
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
};

export default BookmarksScreen;
