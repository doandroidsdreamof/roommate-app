import { postingApi } from '@/api';
import BookmarkButton from '@/components/bookmarkButton/BookmarkButton';
import ImageWithFallback from '@/components/listing/imageWithFallback/ImageWithFallback';
import PriceDisplay from '@/components/listing/priceDisplay/PriceDisplay';
import PropertyInfo from '@/components/listing/propertyInfo/PropertyInfo';
import Loading from '@/components/primitives/loading/Loading';
import { useBookmark } from '@/hooks/useBookmark';
import { secureStorage } from '@/storage/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, IconButton, Menu, Text, useTheme } from 'react-native-paper';
import { createStyles } from './PostingDetailScreen.styles';

type RootStackParamList = {
  PostingDetail: { postingId: string };
};

type PostingDetailRouteProp = RouteProp<RootStackParamList, 'PostingDetail'>;
type PostingDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PostingDetail'
>;

const PostingDetailScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const route = useRoute<PostingDetailRouteProp>();
  const navigation = useNavigation<PostingDetailNavigationProp>();
  const queryClient = useQueryClient();
  const { postingId } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['posting', postingId],
    queryFn: () => postingApi.getPosting(postingId),
  });

  const posting = data?.data;

  const {
    isBookmarked,
    toggleBookmark,
    isLoading: bookmarkLoading,
  } = useBookmark({
    postingId,
    isBookmarked: posting?.isBookmarked ?? false,
  });

  const closePostingMutation = useMutation({
    mutationFn: (status: 'inactive' | 'rented') =>
      postingApi.close(postingId, { status }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posting', postingId] });
      void queryClient.invalidateQueries({ queryKey: ['user-postings'] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error('Error closing posting:', error);
    },
  });

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const handleClosePosting = useCallback(() => {
    closeMenu();
    closePostingMutation.mutate('inactive');
  }, [closePostingMutation, closeMenu]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  if (!posting) {
    return null;
  }

  const currentUserId = secureStorage.getUserIdSync();
  const isOwnPosting = currentUserId && posting.userId === currentUserId;

  const images = posting.specs?.images?.images || [];
  const allImages = [{ url: posting.coverImageUrl, order: 0 }, ...images].sort(
    (a, b) => a.order - b.order
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageGalleryContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageGallery}
          >
            {allImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.url }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <View style={styles.header}>
            <IconButton
              icon="arrow-left"
              size={24}
              iconColor={theme.colors.onSurface}
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
            <View style={styles.headerActions}>
              {isOwnPosting ? (
                <Menu
                  key={menuVisible.toString()}
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchorPosition='bottom'
                  anchor={
                    <IconButton
                      style={styles.settingsButton}
                      icon="dots-vertical"
                      size={24}
                      iconColor={theme.colors.onSurface}
                      onPress={openMenu}
                    />
                  }
                >
                  <Menu.Item
                    onPress={handleClosePosting}
                    title="İlanı Kapat"
                    titleStyle={{ color: theme.colors.error }}
                  />
                </Menu>
              ) : (
                <BookmarkButton
                  onPress={toggleBookmark}
                  isBookmarked={isBookmarked}
                  isLoading={bookmarkLoading}
                  style={styles.bookMarkButton}
                />
              )}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text variant="headlineSmall" style={styles.title}>
              {posting.title}
            </Text>
            <Text variant="bodyMedium" style={styles.location}>
              {posting.district}, {posting.city}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <PropertyInfo
              roomCount={posting.roomCount}
              bathroomCount={posting.bathroomCount}
              squareMeters={posting.squareMeters}
            />
          </View>

          <Divider style={styles.divider} />

          {posting.user?.firstName && (
            <>
              <TouchableOpacity style={styles.section}>
                <View style={styles.hostInfo}>
                  <ImageWithFallback
                    uri={posting.user.profileImageUrl}
                    style={styles.hostAvatar}
                    fallbackIconSize={24}
                  />
                  <View style={styles.hostDetails}>
                    <Text variant="titleMedium">{posting.user.firstName}</Text>
                    <Text variant="bodySmall" style={styles.hostSubtitle}>
                      İlan sahibi
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Divider style={styles.divider} />
            </>
          )}

          {posting.specs?.description && (
            <>
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Açıklama
                </Text>
                <Text variant="bodyMedium" style={styles.description}>
                  {posting.specs.description}
                </Text>
              </View>
              <Divider style={styles.divider} />
            </>
          )}

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Özellikler
            </Text>
            <View style={styles.amenitiesGrid}>
              {posting.isFurnished && (
                <View style={styles.amenityItem}>
                  <MaterialCommunityIcons
                    name="sofa"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text variant="bodyMedium">Eşyalı</Text>
                </View>
              )}
              {posting.specs?.hasParking && (
                <View style={styles.amenityItem}>
                  <MaterialCommunityIcons
                    name="car"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text variant="bodyMedium">Otopark</Text>
                </View>
              )}
              {posting.specs?.hasBalcony && (
                <View style={styles.amenityItem}>
                  <MaterialCommunityIcons
                    name="balcony"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text variant="bodyMedium">Balkon</Text>
                </View>
              )}
              {posting.specs?.hasElevator && (
                <View style={styles.amenityItem}>
                  <MaterialCommunityIcons
                    name="elevator"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text variant="bodyMedium">Asansör</Text>
                </View>
              )}
              {posting.specs?.billsIncluded && (
                <View style={styles.amenityItem}>
                  <MaterialCommunityIcons
                    name="cash-multiple"
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text variant="bodyMedium">Faturalar Dahil</Text>
                </View>
              )}
            </View>
          </View>

          <Divider style={styles.divider} />

          {posting.specs && (
            <>
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Ev Detayları
                </Text>
                <View style={styles.detailsGrid}>
                  {posting.specs.floor !== undefined &&
                    posting.specs.totalFloors !== undefined && (
                      <View style={styles.detailRow}>
                        <Text variant="bodyMedium" style={styles.detailLabel}>
                          Kat
                        </Text>
                        <Text variant="bodyMedium" style={styles.detailValue}>
                          {posting.specs.floor} / {posting.specs.totalFloors}
                        </Text>
                      </View>
                    )}
                  {posting.specs.depositAmount !== undefined && (
                    <View style={styles.detailRow}>
                      <Text variant="bodyMedium" style={styles.detailLabel}>
                        Depozito
                      </Text>
                      <Text variant="bodyMedium" style={styles.detailValue}>
                        ₺{posting.specs.depositAmount.toLocaleString('tr-TR')}
                      </Text>
                    </View>
                  )}
                  {posting.specs.currentOccupants !== null &&
                    posting.specs.totalCapacity !== null && (
                      <View style={styles.detailRow}>
                        <Text variant="bodyMedium" style={styles.detailLabel}>
                          Mevcut Kişi Sayısı
                        </Text>
                        <Text variant="bodyMedium" style={styles.detailValue}>
                          {posting.specs.currentOccupants} /{' '}
                          {posting.specs.totalCapacity}
                        </Text>
                      </View>
                    )}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      {posting.rentAmount !== undefined && (
        <View style={styles.bottomBar}>
          <PriceDisplay amount={posting.rentAmount} variant="large" />
          {!isOwnPosting && (
            <TouchableOpacity
              style={[
                styles.contactButton,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text variant="titleMedium" style={styles.contactButtonText}>
                İletişime Geç
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default PostingDetailScreen;
