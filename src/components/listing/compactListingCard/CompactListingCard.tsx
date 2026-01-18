import { PostingItem } from '@/api/index';
import BookmarkButton from '@/components/bookmarkButton/BookmarkButton';
import IconWithText from '@/components/listing/iconWithText/IconWithText';
import PriceDisplay from '@/components/listing/priceDisplay/PriceDisplay';
import { useBookmark } from '@/hooks/useBookmark';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import ImageWithFallback from '../imageWithFallback/ImageWithFallback';
import { createStyles } from './CompactListingCard.styles';

interface CompactListingCardProps {
  listing: PostingItem;
  isBookmarked?: boolean;
  onPress?: (postingId: string) => void;
}

const CompactListingCard = ({
  listing,
  isBookmarked = false,
  onPress,
}: CompactListingCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    isBookmarked: bookmarked,
    toggleBookmark,
    isLoading,
  } = useBookmark({
    postingId: listing.id,
    initialBookmarked: isBookmarked,
  });

  const handlePress = () => {
    onPress?.(listing.id);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <ImageWithFallback
          uri={listing.coverImageUrl}
          style={styles.image}
          fallbackIconSize={48}
        />

        <BookmarkButton
          onPress={toggleBookmark}
          isBookmarked={bookmarked}
          isLoading={isLoading}
          style={styles.bookmarkButton}
        />
      </View>

      <View style={styles.content}>
        <Text variant="titleSmall" numberOfLines={1} style={styles.title}>
          {listing.district}, {listing.city}
        </Text>

        <Text variant="bodySmall" numberOfLines={1} style={styles.subtitle}>
          {listing.title}
        </Text>

        {listing.rentAmount !== null && listing.rentAmount !== undefined && (
          <PriceDisplay amount={listing.rentAmount} variant="small" />
        )}

        {listing.viewCount > 0 && (
          <IconWithText
            icon="eye"
            text={listing.viewCount}
            iconSize={12}
            iconColor={theme.colors.onSurface}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CompactListingCard;
