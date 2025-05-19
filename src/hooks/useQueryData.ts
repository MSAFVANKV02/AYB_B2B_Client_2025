import {  QueryFunction, QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";


// export const useQueryData = (queryKey:QueryKey, queryFn:QueryFunction, enabled?:Enabled) => {
//     const {data, isPending, isFetched, refetch, isFetching} = useQuery({
//         queryKey,
//         queryFn,
//         enabled
//     })
//     return{
//         data,
//         isPending,
//         isFetched,
//         refetch,
//         isFetching,
//     }
// }
// type UseQueryDataOptions = {
//     enabled?: boolean;
//     disableRefetch?: boolean;
//   };
  
//   export const useQueryData = <T>(
//     queryKey: QueryKey,
//     queryFn: QueryFunction<T>,
//     options?: UseQueryDataOptions
//   ) => {
//     const { enabled = true, disableRefetch = false } = options ?? {};
  
//     const { data, isPending, isFetched, refetch, isFetching } = useQuery<T>({
//       queryKey,
//       queryFn,
//       enabled,
//       refetchOnWindowFocus: !disableRefetch, // ✅ uses your custom flag
//     });
  
//     return {
//       data,
//       isPending,
//       isFetched,
//       refetch,
//       isFetching,
//     };
//   };


type UseQueryDataOptions<T> = {
  enabled?: boolean;
  disableRefetch?: boolean;
  staleTime?: number;
  cacheTime?: number;
  select?: UseQueryOptions<T>['select'];
};

export const useQueryData = <T>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  options?: UseQueryDataOptions<T>
) => {
  const {
    enabled = true,
    disableRefetch = false,
    staleTime = Infinity,
    cacheTime = 1000 * 60 * 30,
    select,
  } = options ?? {};

  const { data, isPending, isFetched, refetch, isFetching } = useQuery<T>({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    cacheTime,
    select,
    refetchOnWindowFocus: !disableRefetch,
    refetchOnMount: !disableRefetch,
    refetchOnReconnect: !disableRefetch,
  } as UseQueryOptions<T>); // Type assertion to allow full config
  // Alternatively, you can use generic overload below to avoid cast

  return {
    data,
    isPending,
    isFetched,
    refetch,
    isFetching,
  };
};
