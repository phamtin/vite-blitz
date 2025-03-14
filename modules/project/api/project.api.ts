import api from "../../../api/api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

const useGetMyProjects = <TData, TError = Error>(
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey">
) => {
  return useQuery({
    queryKey: ["useGetMyProjects"],
    queryFn: async () => {
      const res = await api.get("projects/my-projects");

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return ((await res.json()) as any).data as TData;
    },
    ...options,
  });
};

export { useGetMyProjects };
