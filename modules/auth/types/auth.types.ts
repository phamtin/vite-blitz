export interface LoginGoogleRequest {
	email: string;
	fullname: string;
	firstname: string;
	lastname: string;
	avatar: string;
}

export interface GoogleLoginResponse {
	_id: string;
	jwt: string;
	profileInfo: {
		avatar: string;
		email: string;
		fullname: string;
		firstname: string;
		lastname: string;
		phoneNumber: string[];
		birthday?: Date;
		locale: string;
		isPrivateAccount: boolean;
	};
	accountSettings: {
		theme: string;
	};
}
