import { ListsQueryParams } from '@/api/postingApi';
import { StateCreator } from 'zustand';

export interface FilterSlice {
  filters: ListsQueryParams;

  setFilters: (filters: Partial<ListsQueryParams>) => void;
  clearFilters: () => void;
  getFilters: () => void;
  clearFilter: (key: keyof ListsQueryParams) => void;
}

export const createFilterSlice: StateCreator<FilterSlice> = (set, get) => ({
  filters: {},
  // TODO potential memory leak
  // Clear filters on unmount
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilter: (key) =>
    set((state) => {
      const { [key]: _, ...rest } = state.filters;
      return { filters: rest };
    }),

  clearFilters: () =>
    set(() => ({
      filters: {},
    })),

  getFilters: () => {
    const state = get();
    return state.filters;
  },
});
