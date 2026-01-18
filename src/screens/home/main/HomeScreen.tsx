import HorizontalListingList from '@/components/listing/horizontalListingList/HorizontalListingList';
import SectionHeader from '@/components/listing/sectionHeader/SectionHeader';
import SearchBar from '@/components/search/searchBar/SearchBar';
import SearchModal from '@/components/search/searchModal/SearchModal';
import { useHomeSections } from '@/hooks/useHomeSection';
import { useStore } from '@/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './HomeScreen.styles';
import { HomeStackParamList } from '@/navigation/HomeStackNavigator';
import { ListsQueryParams } from '@/api';
import { HOME_SECTIONS } from './homeSections';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const HomeScreen = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const profile = useStore((state) => state.profile);
  const sectionsData = useHomeSections();

  const handlePostingPress = useCallback(
    (postingId: string) => {
      navigation.navigate('PostingDetail', { postingId });
    },
    [navigation]
  );

  const handleSeeAll = useCallback(
    (title: string, params: Omit<ListsQueryParams, 'cursor'>) => {
      navigation.navigate('Listings', { title, params });
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <SearchBar onPress={() => setIsSearchModalVisible(true)} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {HOME_SECTIONS.map((section) => {
          const sectionData = sectionsData[section.dataKey];
          const title = section.getTitleFn(profile ?? {});
          const params = section.getParamsFn(profile ?? {});

          return (
            <React.Fragment key={section.id}>
              <SectionHeader
                title={title}
                onSeeAll={() => handleSeeAll(title, params)}
              />
              <HorizontalListingList
                data={sectionData.data?.lists}
                isLoading={sectionData.isLoading}
                onPostingPress={handlePostingPress}
              />
            </React.Fragment>
          );
        })}
      </ScrollView>

      <SearchModal
        visible={isSearchModalVisible}
        onDismiss={() => setIsSearchModalVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;
