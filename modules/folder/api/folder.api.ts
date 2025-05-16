import api from "../../../api/api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

const useGetMyFolders = <TData, TError = Error>(
	options?: Omit<UseQueryOptions<TData, TError>, "queryKey">,
) => {
	return useQuery({
		queryKey: ["useGetMyFolders"],
		queryFn: async () => {
			const res = await api.get("folders/my-folders");

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			return ((await res.json()) as any).data as TData;
		},
		...options,
	});
};

export { useGetMyFolders };
