import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import api from 'api/api';
import type { Ok } from 'types/response.type';

const useGetMyFolders = <TData, TError = Error>(
	options?: Omit<UseQueryOptions<TData, TError>, 'queryKey'>,
) => {
	return useQuery({
		queryKey: ['useGetMyFolders'],
		queryFn: async () => {
			const res = await api.get('folders/my-folders');

			return ((await res.json()) as Ok<TData>).data;
		},
		...options,
	});
};

const useGetFolderById = <TData, TError = Error>(
	folderId: string,
	options?: Omit<UseQueryOptions<TData, TError>, 'queryKey'>,
) => {
	return useQuery({
		queryKey: ['useGetFolderById', folderId],
		queryFn: async () => {
			const res = await api.get(`folders/${folderId}`);
			return ((await res.json()) as Ok<TData>).data;
		},
		...options,
	});
};

const FolderApi = { useGetMyFolders, useGetFolderById };

export default FolderApi;
