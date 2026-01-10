import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

const log = (emoji: string, title: string, content: unknown) => {
  if (__DEV__) {
    console.log(
      `${emoji} [React Query: ${title}]`,
      JSON.stringify(content, null, 2)
    );
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onSuccess: (data, query) => {
      log('🟢', 'Query Success', { key: query.queryKey, data });
    },
    onError: (error, query) => {
      log('🔴', 'Query Error', { key: query.queryKey, error: error.message });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      log('🟣', 'Mutation Success', { variables, data });
    },
    onError: (error, variables, context, mutation) => {
      log('🟠', 'Mutation Error', { variables, error: error.message });
    },
  }),
});
