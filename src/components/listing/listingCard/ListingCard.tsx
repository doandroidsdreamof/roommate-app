import { PostingItem } from '@/api/postingApi';
import React, { useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import { Card, Chip, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './ListingCard.styles';
import BookmarkButton from '@/components/bookmarkButton/BookmarkButton';
import IconWithText from '@/components/iconWithText/IconWithText';
import { useBookmark } from '@/hooks/useBookmark';

interface ListingCardProps {
  listing: Partial<PostingItem> & {
    id: string;
    title: string;
    city: string;
    district: string;
    coverImageUrl: string | null;
  };
  onPress?: (id: string) => void;
  isBookmarked?: boolean;
}

const genderLabels = {
  male_only: 'Erkek',
  female_only: 'Kadın',
  mixed: 'Farketmez',
} as const;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
  });
};

const ListingCard = ({
  listing,
  onPress,
  isBookmarked = false,
}: ListingCardProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
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
    <Card style={styles.card} onPress={() => onPress?.(listing.id)}>
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
              size={64}
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

        {listing.rentAmount != null && (
          <View style={styles.priceTag}>
            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onPrimary }}
            >
              ₺{listing.rentAmount.toLocaleString('tr-TR')}
            </Text>
          </View>
        )}
      </View>

      <Card.Content style={styles.content}>
        <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
          {listing.title}
        </Text>

        <IconWithText
          icon="map-marker"
          text={`${listing.district}, ${listing.city}`}
          iconSize={16}
          iconColor={theme.colors.secondary}
          style={styles.locationRow}
        />

        {(listing.roomCount != null || listing.preferredRoommateGender) && (
          <View style={styles.chipsRow}>
            {listing.roomCount != null && (
              <Chip mode="outlined" compact style={styles.chip}>
                {listing.roomCount}+1
              </Chip>
            )}
            {listing.preferredRoommateGender && (
              <Chip mode="outlined" compact style={styles.chip}>
                {genderLabels[listing.preferredRoommateGender]}
              </Chip>
            )}
          </View>
        )}

        {(listing.viewCount != null || listing.availableFrom) && (
          <View style={styles.footer}>
            {listing.viewCount != null && (
              <IconWithText
                icon="eye-outline"
                text={listing.viewCount}
                iconSize={14}
                iconColor={theme.colors.secondary}
              />
            )}
            {listing.availableFrom && (
              <Text style={styles.textSecondary}>
                {formatDate(listing.availableFrom)}
              </Text>
            )}
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

export default React.memo(ListingCard, (prevProps, nextProps) => {
  return (
    prevProps.listing.id === nextProps.listing.id &&
    prevProps.isBookmarked === nextProps.isBookmarked
  );
});
