import { QueryClient } from "@tanstack/react-query";

// configs pour react-query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 2,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false
    }
  },
});