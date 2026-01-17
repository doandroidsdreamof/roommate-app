import { PostingItem } from '@/api/postingApi';
import Loading from '@/components/loading/Loading';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import CompactListingCard from '../compactListingCard/CompactListingCard';
import { createStyles } from './HorizontalListingList.styles';

interface HorizontalListingListProps {
  data: PostingItem[] | undefined;
  isLoading?: boolean;
  onPostingPress: (postingId: string) => void;
}

const HorizontalListingList = ({
  data,
  isLoading,
  onPostingPress,
}: HorizontalListingListProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading size="small" />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <CompactListingCard
            isBookmarked={item.isBookmarked}
            listing={item}
            onPress={onPostingPress}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      snapToInterval={316}
      decelerationRate="fast"
      snapToAlignment="start"
    />
  );
};

export default HorizontalListingList;
