import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import api from "api/api";
import useAppState from "store";
import type { Ok } from "types/response.type";
import type { AccountModel, UpdateProfileRequest } from "../types/account.types";

const useUpdateProfile = (onSuccessCallback?: () => void) => {
	const { setCurrentUser } = useAppState();

	const mutationUpdateProfileInfo = useMutation({
		mutationFn: (data: UpdateProfileRequest): Promise<Ok<AccountModel>> => {
			return api.patch("accounts/profile", { json: data }).json();
		},
		onSuccess: (data: Ok<AccountModel>) => {
			const { accountSettings, profileInfo } = data.data;
			setCurrentUser({ accountSettings, profileInfo });
			onSuccessCallback?.();
		},
	});

	return { mutationUpdateProfileInfo };
};

const useGetAccountByEmail = <TData, TError = Error>(
  email: string,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey'>,) => {
  return useQuery({
    queryKey: ["useGetAccountByEmail", email],
    queryFn: async () => {
      const res = await api.get(`accounts/search?email=${email}`)
      return ((await res.json()) as Ok<TData>).data;
    },
    enabled: !!email,
    ...options,
  })
}

const ProfileApi = { useUpdateProfile, useGetAccountByEmail };

export default ProfileApi;
