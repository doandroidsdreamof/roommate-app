import React, { useState } from 'react';
import { View } from 'react-native';
import SearchBar from '@/components/search/searchBar/SearchBar';
import SearchModal from '@/components/search/searchModal/SearchModal';
import { styles } from './HomeScreen.styles';

const HomeScreen = () => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <SearchBar onPress={() => setIsSearchModalVisible(true)} />
      <SearchModal
        visible={isSearchModalVisible}
        onDismiss={() => setIsSearchModalVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;
