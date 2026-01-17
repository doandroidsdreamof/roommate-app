import HorizontalListingList from '@/components/listing/horizontalListingList/HorizontalListingList';
import SectionHeader from '@/components/listing/sectionHeader/SectionHeader';
import SearchBar from '@/components/search/searchBar/SearchBar';
import SearchModal from '@/components/search/searchModal/SearchModal';
import { useHomeSections } from '@/hooks/useHomeSection';
import { useStore } from '@/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './HomeScreen.styles';
import { HomeStackParamList } from '@/navigation/HomeStackNavigator';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const HomeScreen = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const profile = useStore((state) => state.profile);
  const { forYou, popular, mostSaved, newest } = useHomeSections();

  const handlePostingPress = (postingId: string) => {
    navigation.navigate('PostingDetail', { postingId });
  };

  return (
    <View style={styles.container}>
      <SearchBar onPress={() => setIsSearchModalVisible(true)} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader
          title={`Sizin İçin - ${profile?.district || 'Bölgeniz'}`}
          onSeeAll={() => {
            /* TODO: Navigate */
          }}
        />
        <HorizontalListingList
          data={forYou.data?.lists}
          isLoading={forYou.isLoading}
          onPostingPress={handlePostingPress}
        />

        <SectionHeader
          title="Popüler İlanlar"
          onSeeAll={() => {
            /* TODO: Navigate */
          }}
        />
        <HorizontalListingList
          data={popular.data?.lists}
          isLoading={popular.isLoading}
          onPostingPress={handlePostingPress}
        />

        <SectionHeader
          title="En Çok Kaydedilenler"
          onSeeAll={() => {
            /* TODO: Navigate */
          }}
        />
        <HorizontalListingList
          data={mostSaved.data?.lists}
          isLoading={mostSaved.isLoading}
          onPostingPress={handlePostingPress}
        />

        <SectionHeader
          title={`${profile?.city} -  Yeni İlanlar`}
          onSeeAll={() => {
            /* TODO: Navigate */
          }}
        />
        <HorizontalListingList
          data={newest.data?.lists}
          isLoading={newest.isLoading}
          onPostingPress={handlePostingPress}
        />
      </ScrollView>

      <SearchModal
        visible={isSearchModalVisible}
        onDismiss={() => setIsSearchModalVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;
