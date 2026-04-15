'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState, useEffect } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Default stale time for all queries
            staleTime: 5 * 60 * 1000, // 5 minutes
            // Default cache time for all queries
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            // Default retry behavior
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors (client errors)
              if (error?.response?.status >= 400 && error?.response?.status < 500) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
            // Default refetch behavior
            refetchOnWindowFocus: false, // Don't refetch on window focus by default
            refetchOnReconnect: true, // Refetch on reconnection
            refetchOnMount: true, // Refetch on component mount if stale
            
            // Memory management options
            refetchInterval: false, // Disable automatic refetching
            refetchIntervalInBackground: false, // Don't refetch when tab is in background
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
          },
          mutations: {
            // Default retry behavior for mutations
            retry: (failureCount, error: any) => {
              // Don't retry mutations by default
              return false;
            },
          },
        },
      })
  );

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      queryClient.clear();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools 
        initialIsOpen={false} buttonPosition="bottom-left"
      /> */}
    </QueryClientProvider>
  );
}
