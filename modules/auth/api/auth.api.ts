import api from "api/api";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";
import type { GoogleLoginResponse, LoginGoogleRequest } from "../types/auth.types";
import type { Ok } from "types/response.type";
import useAppState from "store";

type GoogleLoginProps = {
	onSuccess?: (data: Ok<GoogleLoginResponse>) => void;
};
const useGoogleLogin = (props: GoogleLoginProps) => {
	const { setCurrentUser } = useAppState();

	const mutationLoginWithGoogle = useMutation({
		mutationFn: (request: LoginGoogleRequest): Promise<Ok<GoogleLoginResponse>> => {
			return api.post("auth/signin/google", { json: request }).json();
		},
		onSuccess: (data: Ok<GoogleLoginResponse>) => {
			const { jwt, accountSettings, profileInfo } = data.data;
			setCurrentUser({ jwt, accountSettings, profileInfo });
			window.location.reload();
		},
	});

	return { mutationLoginWithGoogle };
};

const AuthApi = { useGoogleLogin };

export default AuthApi;
