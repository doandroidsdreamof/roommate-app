import { ListsQueryParams } from '@/api/postingApi';
import { ExpandedSection } from '../modalAccordion/ModalAccordion';
import { Text } from 'react-native-paper';
import React from 'react';
import LocationFilter from '@/components/locationFilter/LocationFilter';

type FilterSection = Exclude<ExpandedSection, null>;

interface FilterConfig {
  id: string;
  title: string;
  section: FilterSection;
  fields: (keyof ListsQueryParams)[];
  renderComponent: (props: {
    filterValues: Record<string, any>;
    onFilterChange: (field: string, value: any) => void;
  }) => React.ReactElement;
}

export const FILTER_SECTIONS: FilterConfig[] = [
  {
    id: 'rent',
    title: 'Fiyat aralığı',
    section: 'rent',
    fields: ['minRent', 'maxRent'],
    renderComponent: ({ filterValues }) => (
      <Text>
        [Range slider for rent: {filterValues.minRent} - {filterValues.maxRent}]
      </Text>
    ),
  },
  {
    id: 'rooms',
    title: 'Oda sayısı',
    section: 'rooms',
    fields: ['minRooms', 'maxRooms'],
    renderComponent: () => <Text>[Stepper for rooms]</Text>,
  },
  {
    id: 'size',
    title: 'Metre kare',
    section: 'size',
    fields: ['minSquareMeters', 'maxSquareMeters'],
    renderComponent: () => <Text>[Range slider for size]</Text>,
  },
  {
    id: 'gender',
    title: 'Ev arkadaşının cinsiyeti',
    section: 'gender',
    fields: ['preferredRoommateGender'],
    renderComponent: () => <Text>[Chip select for gender]</Text>,
  },
  {
    id: 'furnished',
    title: 'Mobilyalı',
    section: 'furnished',
    fields: ['isFurnished'],
    renderComponent: () => <Text>[Tri-state toggle]</Text>,
  },
  {
    id: 'availableFrom',
    title: 'İlanın Geçerlilik Tarihi',
    section: 'availableFrom',
    fields: ['availableFrom'],
    renderComponent: () => <Text>[Date picker]</Text>,
  },
  {
    id: 'amenities',
    title: 'Olanaklar',
    section: 'amenities',
    fields: [
      'hasParking',
      'hasBalcony',
      'hasElevator',
      'billsIncluded',
      'smokingAllowed',
      'alcoholFriendly',
      'hasPets',
    ],
    renderComponent: () => <Text>[Checkbox list]</Text>,
  },
];
