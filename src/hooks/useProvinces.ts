import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { locationApi } from '@/api';
import { Province } from '@/api/locationApi';

export const useProvinces = () => {
  const { data: provinces = [], isLoading } = useQuery<Province[]>({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await locationApi.getProvinces();
      return Array.isArray(response) ? response : [];
    },
    staleTime: Infinity,
  });

  const getProvinceByValue = useCallback(
    (value: string) => {
      return provinces.find(
        (p) => p.name.toLocaleLowerCase('tr') === value.toLocaleLowerCase('tr')
      );
    },
    [provinces]
  );

  const filterProvinces = useCallback(
    (input: string) => {
      if (!input) return provinces;
      return provinces.filter((p) =>
        p.name.toLocaleLowerCase('tr').startsWith(input.toLocaleLowerCase('tr'))
      );
    },
    [provinces]
  );

  return { provinces, getProvinceByValue, filterProvinces, isLoading };
};
