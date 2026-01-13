import { locationApi } from '@/api';
import { District, Province } from '@/api/locationApi';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

const useDistricts = (selectedProvinceData?: Province) => {
  const { data: districts = [], isFetching } = useQuery<District[]>({
    queryKey: ['districts', selectedProvinceData?.plateCode],
    queryFn: (): Promise<District[]> => {
      if (!selectedProvinceData) {
        return Promise.resolve([]);
      }
      return locationApi.getDistrictsByProvince(selectedProvinceData.plateCode);
    },
    enabled: !!selectedProvinceData,
    staleTime: Infinity,
  });

  const getDistrictByValue = useCallback(
    (value: string) => {
      return districts.find(
        (d) => d.name.toLocaleLowerCase('tr') === value.toLocaleLowerCase('tr')
      );
    },
    [districts]
  );

  const filterDistricts = useCallback(
    (input: string) => {
      if (!input) return districts;
      return districts.filter((d) =>
        d.name.toLocaleLowerCase('tr').includes(input.toLocaleLowerCase('tr'))
      );
    },
    [districts]
  );

  return { districts, getDistrictByValue, filterDistricts, isFetching };
};

export default useDistricts;
