import ListingCard from '@/components/listing/listingCard/ListingCard';
import { useUserPostings } from '@/hooks/useUserPostings';
import { PostingStackParamList } from '@/navigation/PostingStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { createStyles } from './UserPostingsList.styles';
import { MAXIMUM_POSTINGS } from '@/constants/constraints';

interface UserPostingsListProps {
  onCreatePress: () => void;
}

type NavigationProp = NativeStackNavigationProp<PostingStackParamList>;

const UserPostingsList = ({ onCreatePress }: UserPostingsListProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const { postings, isLoading } = useUserPostings();

  const hasReachedLimit = postings?.length >= MAXIMUM_POSTINGS;

  const handlePostingPress = useCallback(
    (postingId: string) => {
      navigation.navigate('PostingDetail', { postingId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof postings)[0] }) => (
      <ListingCard
        noVerticalMargin
        disableBookmark={true}
        listing={item}
        onPress={handlePostingPress}
      />
    ),
    [handlePostingPress]
  );

  const keyExtractor = useCallback((item: (typeof postings)[0]) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={onCreatePress}
          mode="contained"
          disabled={hasReachedLimit}
        >
          {hasReachedLimit
            ? 'En fazla iki ilan verilebilir'
            : 'Ev arkadaşı ilanı ver'}
        </Button>
      </View>

      <View style={styles.postingsContainer}>
        <Text variant="titleLarge" style={styles.title}>
          İlanlarım
        </Text>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : postings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              Henüz ilan vermediniz
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtext}>
              Yukarıdaki butona tıklayarak ilan oluşturabilirsiniz
            </Text>
          </View>
        ) : (
          <FlatList
            data={postings}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        )}
      </View>
    </View>
  );
};

export default UserPostingsList;
