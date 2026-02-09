// src/app/providers/QueryProvider.tsx
import React, { useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Query, Mutation } from "@tanstack/query-core";

type QueryProviderProps = {
  children: React.ReactNode;
};

function isDev() {
  // Vite env
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof import.meta !== "undefined" && (import.meta as any).env?.DEV === true;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const client = useMemo(() => {
    const queryCache = new QueryCache({
      onError: (
        error: Error,
        query: Query<unknown, unknown, unknown, readonly unknown[]>
      ) => {
        // Ne crash jamais l'app ici. Juste log si besoin.
        // console.error("[RQ][QueryError]", error, query.queryKey);
        void query; // évite warning si tu laisses le log commenté
        void error;
      },
    });

    const mutationCache = new MutationCache({
      onError: (
        error: Error,
        _variables: unknown,
        _onMutateResult: unknown,
        mutation: Mutation<unknown, unknown, unknown, unknown>
        // TanStack peut fournir un 5e param context selon signatures internes,
        // on n’en a pas besoin ici.
      ) => {
        // console.error("[RQ][MutationError]", error, mutation.options?.mutationKey);
        void mutation;
        void error;
        void _variables;
        void _onMutateResult;
      },
    });

    return new QueryClient({
      queryCache,
      mutationCache,
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
          staleTime: 20_000,
        },
        mutations: {
          retry: 0,
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
      {isDev() ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}
