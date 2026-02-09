import { ListsQueryParams } from '@/api/postingApi';
import LocationFilter from '@/components/location/locationFilter/LocationFilter';
import LocationPicker, {
  LocationData,
} from '@/components/location/locationPicker/LocationPicker';
import { HomeStackParamList } from '@/navigation/HomeStackNavigator';
import { useStore } from '@/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import ModalAccordion from '../modalAccordion/ModalAccordion';
import { FILTER_SECTIONS } from './FilterItems';
import { createStyles } from './SearchModal.styles';

interface SearchModalProps {
  visible: boolean;
  onDismiss: () => void;
  navigation: NativeStackNavigationProp<HomeStackParamList>;
}
const initialState: Pick<ListsQueryParams, 'province' | 'district'> = {
  province: '',
  district: '',
};

type SearchParam = Partial<ListsQueryParams>;

const SearchModal = ({ visible, onDismiss, navigation }: SearchModalProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchParams, setSearchParams] = useState<SearchParam>(initialState);

  const setFilters = useStore((state) => state.setFilters);
  const clearFilters = useStore((state) => state.clearFilters);

  const handleFilterChange = useCallback(
    <K extends keyof ListsQueryParams>(
      field: K,
      value: ListsQueryParams[K]
    ) => {
      setSearchParams((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleLocationSelect = useCallback((location: LocationData) => {
    const province = location.province || '';
    const district = location.district || '';

    setSearchParams((prev) => ({
      ...prev,
      province,
      district,
    }));
  }, []);

  const handleCityChange = useCallback(
    (value: string) => {
      handleFilterChange('province', value);
    },
    [handleFilterChange]
  );

  const handleDistrictChange = useCallback(
    (value: string) => {
      handleFilterChange('district', value);
    },
    [handleFilterChange]
  );
  const handleSearch = useCallback(() => {
    const { province, ...rest } = searchParams;
    const backendParams = {
      ...rest,
      ...(province && { city: province }),
    };

    setFilters(backendParams);

    navigation.navigate('Listings', {
      title: 'Arama Sonuçları',
      params: backendParams,
    });

    onDismiss();
  }, [searchParams, setFilters, navigation, onDismiss]);
  const handleClearAll = useCallback(() => {
    setSearchParams(initialState);
    clearFilters();
  }, [clearFilters]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <IconButton
              icon="close"
              size={24}
              onPress={onDismiss}
              style={styles.closeButton}
              iconColor={theme.colors.onSurface}
              hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
            />
          </View>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <Text style={styles.title}>Nerede?</Text>
              <View style={styles.searchInputContainer}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color={theme.colors.onSurfaceVariant}
                  style={styles.searchIcon}
                />
                <TextInput
                  onChangeText={(text) => handleFilterChange('search', text)}
                  style={styles.searchInput}
                  placeholder="İlanları arayın"
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                />
              </View>
              <LocationPicker onLocationSelect={handleLocationSelect} />
              <LocationFilter
                initialCity={searchParams.province}
                initialDistrict={searchParams.district}
                onCityChange={handleCityChange}
                onDistrictChange={handleDistrictChange}
              />
              {FILTER_SECTIONS.filter((item) => item.id !== 'location').map(
                (item) => (
                  <ModalAccordion key={item.id} title={item.title}>
                    {item.renderComponent({
                      filterValues: searchParams,
                      onFilterChange: handleFilterChange,
                    })}
                  </ModalAccordion>
                )
              )}
            </View>
          </ScrollView>
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearButton}>Filtreleri Temizle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color={theme.colors.onPrimary}
              />
              <Text style={styles.searchButtonText}>Ara</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchModal;
