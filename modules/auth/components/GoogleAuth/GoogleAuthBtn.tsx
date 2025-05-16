import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Flex } from "antd";
import AuthApi from "modules/auth/api/auth.api";

const GoogleAuthBtn = () => {
	const { mutationLoginWithGoogle } = AuthApi.useGoogleLogin({});

	const onSuccess = ({ clientId, credential, select_by }: CredentialResponse) => {
		if (!clientId || !credential || !select_by) {
			throw new Error("Google Login failed");
		}
		mutationLoginWithGoogle.mutate({
			credential,
			clientId,
			selectBy: select_by,
		});
	};

	const onError = () => {
		console.log("Google Login failed");
	};

	return (
		<Flex>
			<GoogleLogin
				shape="circle"
				size="large"
				logo_alignment="center"
				text="signin_with"
				locale="en-AU"
				containerProps={{ style: { width: "100%" } }}
				onSuccess={onSuccess}
				onError={onError}
			/>
		</Flex>
	);
};
export default GoogleAuthBtn;
