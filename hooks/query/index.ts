import {
  useQuery,
  useMutation,
  type UseQueryResult,
  type UseQueryOptions,
  type UseMutationResult,
  type UseMutationOptions,
} from "@tanstack/react-query";

const createQueryHook = <TData, TError = Error>(
  defaultQueryKey: string[],
  defaultQueryFn: () => Promise<TData>
): ((
  options?: UseQueryOptions<TData, TError>
) => UseQueryResult<TData, TError>) => {
  return (
    options?: UseQueryOptions<TData, TError>
  ): UseQueryResult<TData, TError> => {
    return useQuery<TData, TError>({
      queryKey: defaultQueryKey,
      queryFn: defaultQueryFn,
      ...options,
    });
  };
};

const createMutationHook = <
  TData,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>
) => {
  return (
    options?: UseMutationOptions<TData, TError, TVariables, TContext>
  ): UseMutationResult<TData, TError, TVariables, TContext> => {
    return useMutation<TData, TError, TVariables, TContext>({
      mutationFn,
      ...options,
    });
  };
};

export { createQueryHook, createMutationHook };
