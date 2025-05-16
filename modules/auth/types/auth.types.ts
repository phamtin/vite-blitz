import type { AccountModel } from "modules/account/types/account.types";

export interface LoginGoogleRequest {
	email: string;
	username: string;
	firstname: string;
	lastname: string;
	avatar: string;
}

export type GoogleLoginResponse = { jwt: string } & AccountModel;
