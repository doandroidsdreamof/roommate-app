import { locationApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useNeighborhoods = (districtId?: number) => {
  const {
    data: neighborhoods = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['neighborhoods', districtId],
    queryFn: () => locationApi.getNeighborhoodsByDistrict(districtId!),
    enabled: !!districtId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const filterNeighborhoods = (searchText: string) => {
    if (!searchText) return neighborhoods;
    return neighborhoods.filter((n) =>
      n.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const getNeighborhoodById = (id: number) => {
    return neighborhoods.find((n) => n.id === id);
  };

  return {
    neighborhoods,
    isLoading,
    error: error || null,
    filterNeighborhoods,
    getNeighborhoodById,
  };
};
