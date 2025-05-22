import { useMutation } from "@tanstack/react-query";
import api from "api/api";
import useAppState from "store";
import type { Ok } from "types/response.type";
import { AccountModel, UpdateProfileRequest } from "../types/account.types";

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
    }
  })

  return { mutationUpdateProfileInfo };
};

const ProfileApi = { useUpdateProfile };

export default ProfileApi;
