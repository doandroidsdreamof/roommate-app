import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import SearchBar from '@/components/search/searchBar/SearchBar';
import SearchModal from '@/components/search/searchModal/SearchModal';
import SectionHeader from '@/components/sectionHeader/SectionHeader';
import { useStore } from '@/store';
import { styles } from './HomeScreen.styles';
import HorizontalListingList from '@/components/listing/horizontalListingList/HorizontalListingList';
import { useHomeSections } from '@/hooks/useHomeSection';

const HomeScreen = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const profile = useStore((state) => state.profile);
  const { forYou, popular, mostSaved, newest } = useHomeSections();

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
        />

        <SectionHeader
          title={`${profile?.city || 'Şehriniz'}'da Yeni İlanlar`}
          onSeeAll={() => {
            /* TODO: Navigate */
          }}
        />
        <HorizontalListingList
          data={newest.data?.lists}
          isLoading={newest.isLoading}
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
