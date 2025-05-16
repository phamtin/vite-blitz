import type { AccountModel } from "modules/account/types/account.types";

export interface LoginGoogleRequest {
	credential: string;
	clientId: string;
	selectBy: string;
}

export type GoogleLoginResponse = { jwt: string } & AccountModel;
