import { ListsQueryParams } from '@/api/postingApi';
import LocationFilter from '@/components/locationFilter/LocationFilter';
import LocationPicker, {
  LocationData,
} from '@/components/locationPicker/LocationPicker';
import { useStore } from '@/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useRef, useState } from 'react';
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
}

const SearchModal = ({ visible, onDismiss }: SearchModalProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const setFilters = useStore((state) => state.setFilters);
  const clearFilters = useStore((state) => state.clearFilters);

  const filtersRef = useRef<Partial<ListsQueryParams>>({});
  // TODO bottleneck
  const [localCity, setLocalCity] = useState<string>('');
  const [localDistrict, setLocalDistrict] = useState<string>('');

  const handleFilterChange = useCallback(
    (field: string, value: string | number | boolean) => {
      filtersRef.current = {
        ...filtersRef.current,
        [field]: value,
      };
    },
    []
  );

  const handleLocationSelect = useCallback((location: LocationData) => {
    const city = location.city || '';
    const district = location.district || '';

    filtersRef.current = {
      ...filtersRef.current,
      city,
      district,
    };
    setLocalCity(city);
    setLocalDistrict(district);
  }, []);

  const handleCityChange = useCallback(
    (value: string) => {
      handleFilterChange('city', value);
      setLocalCity(value);
    },
    [handleFilterChange]
  );

  const handleDistrictChange = useCallback(
    (value: string) => {
      handleFilterChange('district', value);
      setLocalDistrict(value);
    },
    [handleFilterChange]
  );

  const handleSearch = useCallback(() => {
    setFilters(filtersRef.current);
    onDismiss();
  }, [setFilters, onDismiss]);

  const handleClearAll = useCallback(() => {
    filtersRef.current = {};
    setLocalCity('');
    setLocalDistrict('');
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
              iconColor={theme.colors.onSurface}
            />
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <Text style={styles.title}>Where?</Text>

              <View style={styles.searchInputContainer}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color={theme.colors.onSurfaceVariant}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="İlanları arayın"
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                />
              </View>

              <LocationPicker onLocationSelect={handleLocationSelect} />

              <LocationFilter
                city={localCity}
                district={localDistrict}
                onCityChange={handleCityChange}
                onDistrictChange={handleDistrictChange}
              />

              {FILTER_SECTIONS.filter((item) => item.id !== 'location').map(
                (item) => (
                  <ModalAccordion key={item.id} title={item.title}>
                    {item.renderComponent({
                      filterValues: filtersRef.current,
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
