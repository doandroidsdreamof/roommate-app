import { ListsQueryParams } from '@/api/postingApi';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, Chip } from 'react-native-paper';
import DatePicker from '../datePicker/DatePicker';
import RangeSlider from '../rangeSlider/RangeSlider';
import Stepper from '../stepper/Stepper';

interface FilterComponentProps {
  filterValues: Partial<ListsQueryParams>;
  onFilterChange: <K extends keyof ListsQueryParams>(
    field: K,
    value: ListsQueryParams[K]
  ) => void;
}

interface FilterConfig {
  id: string;
  title: string;
  fields: readonly (keyof ListsQueryParams)[];
  renderComponent: (props: FilterComponentProps) => React.ReactElement;
}

// Options
export const GENDER_OPTIONS = [
  { value: 'female_only', label: 'Sadece Kadın' },
  { value: 'male_only', label: 'Sadece Erkek' },
  { value: 'mixed', label: 'Karışık' },
] as const;

export const AMENITY_OPTIONS = [
  { field: 'hasParking', label: 'Otopark' },
  { field: 'hasBalcony', label: 'Balkon' },
  { field: 'hasElevator', label: 'Asansör' },
  { field: 'billsIncluded', label: 'Faturalar Dahil' },
  { field: 'smokingAllowed', label: 'Sigara Serbest' },
  { field: 'alcoholFriendly', label: 'Alkol Serbest mi?' },
  { field: 'hasPets', label: 'Evcil Hayvan Var mı?' },
  { field: 'isFurnished', label: 'Ev Mobilyalı mı' },
] as const;

// Field arrays
export const RENT_FIELDS = ['minRent', 'maxRent'] as const;
export const ROOM_FIELDS = ['minRooms', 'maxRooms'] as const;
export const BATHROOM_FIELDS = ['bathroomCount'] as const;
export const METER_SQUARE_FIELDS = [
  'minSquareMeters',
  'maxSquareMeters',
] as const;
export const AMENITY_FIELDS = AMENITY_OPTIONS.map((o) => o.field);

// Types
export type AmenityField = (typeof AMENITY_OPTIONS)[number]['field'];
export type MeterSquareField = (typeof METER_SQUARE_FIELDS)[number];
export type BathroomField = (typeof BATHROOM_FIELDS)[number];
export type RentField = (typeof RENT_FIELDS)[number];
export type RoomField = (typeof ROOM_FIELDS)[number];
export type GenderValue = (typeof GENDER_OPTIONS)[number]['value'];

export type FilterFieldNames =
  | AmenityField
  | MeterSquareField
  | BathroomField
  | RentField
  | RoomField
  | 'preferredRoommateGender'
  | 'isFurnished'
  | 'availableFrom';

export const FILTER_SECTIONS: FilterConfig[] = [
  {
    id: 'rent',
    title: 'Fiyat aralığı',
    fields: RENT_FIELDS,
    renderComponent: ({ filterValues, onFilterChange }) => (
      <RangeSlider
        min={1}
        max={1000000}
        isSingle={false}
        lowValue={filterValues.minSquareMeters ?? 1}
        highValue={filterValues.maxSquareMeters ?? 1000000}
        onHighChange={(highValue) =>
          onFilterChange('maxSquareMeters', highValue)
        }
        onLowChange={(lowValue) => onFilterChange('minSquareMeters', lowValue)}
        formatLabel={(value) => `₺${value.toLocaleString('tr-TR')}`}
      />
    ),
  },
  {
    id: 'rooms',
    title: 'Oda sayısı',
    fields: ROOM_FIELDS,
    renderComponent: ({ filterValues, onFilterChange }) => (
      <View style={styles.column}>
        <Stepper
          label="Min"
          value={filterValues.minRooms ?? 1}
          min={1}
          max={10}
          onChange={(value) => onFilterChange('minRooms', value)}
        />
        <Stepper
          label="Max"
          value={filterValues.maxRooms ?? 10}
          min={1}
          max={10}
          onChange={(value) => onFilterChange('maxRooms', value)}
        />
      </View>
    ),
  },
  {
    id: 'bathrooms',
    title: 'Banyo sayısı',
    fields: BATHROOM_FIELDS,
    renderComponent: ({ filterValues, onFilterChange }) => (
      <View style={styles.column}>
        <Stepper
          label="bathroomCount"
          value={filterValues.bathroomCount ?? 1}
          min={1}
          max={5}
          onChange={(value) => onFilterChange('bathroomCount', value)}
        />
      </View>
    ),
  },
  {
    id: 'size',
    title: 'Metre kare',
    fields: METER_SQUARE_FIELDS,
    renderComponent: ({ filterValues, onFilterChange }) => (
      <RangeSlider
        min={0}
        max={500}
        step={10}
        lowValue={filterValues.minSquareMeters ?? 0}
        highValue={filterValues.maxSquareMeters ?? 500}
        onLowChange={(value) => onFilterChange('minSquareMeters', value)}
        onHighChange={(value) => onFilterChange('maxSquareMeters', value)}
        formatLabel={(value) => `${value} m²`}
      />
    ),
  },
  {
    id: 'gender',
    title: 'Ev arkadaşının cinsiyeti',
    fields: ['preferredRoommateGender'],
    renderComponent: ({ filterValues, onFilterChange }) => (
      <View style={styles.chipRow}>
        {GENDER_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            selected={filterValues.preferredRoommateGender === option.value}
            onPress={() =>
              onFilterChange(
                'preferredRoommateGender',
                filterValues.preferredRoommateGender === option.value
                  ? undefined
                  : option.value
              )
            }
          >
            {option.label}
          </Chip>
        ))}
      </View>
    ),
  },
  {
    id: 'availableFrom',
    title: 'İlanın Geçerlilik Tarihi',
    fields: ['availableFrom'],
    renderComponent: ({ filterValues, onFilterChange }) => (
      <DatePicker
        value={filterValues.availableFrom}
        onChange={(date) => onFilterChange('availableFrom', date)}
        placeholder="Tarih seçin"
      />
    ),
  },
  {
    id: 'amenities',
    title: 'Olanaklar',
    fields: AMENITY_FIELDS,
    renderComponent: ({ filterValues, onFilterChange }) => (
      <View style={styles.column}>
        {AMENITY_OPTIONS.map(({ field, label }) => (
          <Checkbox.Item
            key={field}
            label={label}
            status={filterValues[field] ? 'checked' : 'unchecked'}
            onPress={() => onFilterChange(field, !filterValues[field])}
          />
        ))}
      </View>
    ),
  },
];

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  column: {
    gap: 8,
  },
});
