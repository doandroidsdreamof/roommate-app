import { PostingItem } from '@/api/index';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './CompactListingCard.styles';
import BookmarkButton from '@/components/bookmarkButton/BookmarkButton';
import IconWithText from '@/components/iconWithText/IconWithText';
import { useBookmark } from '@/hooks/useBookmark';

interface CompactListingCardProps {
  listing: PostingItem;
  onPress?: (id: string) => void;
  isBookmarked?: boolean;
}

const CompactListingCard = ({
  listing,
  onPress,
  isBookmarked = false,
}: CompactListingCardProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [imageError, setImageError] = useState(false);

  const {
    isBookmarked: bookmarked,
    toggleBookmark,
    isLoading,
  } = useBookmark({
    postingId: listing.id,
    initialBookmarked: isBookmarked,
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(listing.id)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {listing.coverImageUrl && !imageError ? (
          <Image
            source={{ uri: listing.coverImageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.image, styles.placeholderContainer]}>
            <MaterialCommunityIcons
              name="home-outline"
              size={48}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        )}

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

        <View style={styles.priceRow}>
          <Text variant="titleSmall" style={styles.price}>
            ₺{listing.rentAmount?.toLocaleString('tr-TR')}
          </Text>
          <Text variant="bodySmall" style={styles.priceLabel}>
            / ay
          </Text>
        </View>

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
