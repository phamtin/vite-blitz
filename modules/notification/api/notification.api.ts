import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "api/api";

const useGetMyNotification = <TData>() => {
	return useQuery({
		queryKey: ["useGetMyNotification"],
		queryFn: async () => {
			const res = await api.get("notifications");

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			return ((await res.json()) as any).data as TData;
		},
	});
};

export type InviteResponseRequest = {
	type: string;
	folderId: string;
	email: string;
};

const useInviteResponse = () => {
	const queryClient = useQueryClient();

	const mutationInviteResponse = useMutation({
		mutationFn: (data: InviteResponseRequest) => {
			return api.post("folders/invite/response", { json: data }).json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["useGetMyNotification"] });
			queryClient.invalidateQueries({ queryKey: ["useGetMyFolders"] });
		},
	});

	return { mutationInviteResponse };
};

export type MarkAsReadRequest = {
	markAll: boolean;
	notificationId?: string;
};

const useMarkAsRead = () => {
	const queryClient = useQueryClient();
	const mutationMarkAsRead = useMutation({
		mutationFn: (data: MarkAsReadRequest) => {
			return api.patch("notifications/mark-read", { json: data }).json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["useGetMyNotification"] });
		},
	});

	return { mutationMarkAsRead };
};

const NotificationApi = {
	useGetMyNotification,
	useInviteResponse,
	useMarkAsRead,
};
export default NotificationApi;
