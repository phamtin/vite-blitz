export enum SigninMethod {
  Google = "Google",
  Telegram = "Telegram",
}

export enum Theme {
  Light = "Light",
  Dark = "Dark",
}

export type ProfileInfo = {
  email: string;
  fullname: string;
  firstname: string;
  lastname: string;
  phoneNumber: string[];
  locale: string;
  avatar: string;
  isPrivateAccount: boolean;
  birthday?: Date;
};

export type AccountSettings = {
  theme: Theme;
};

/**
 * =============================
 *
 *  Account Model
 *
 * =============================
 */
export type AccountModel = {
  _id: string;

  profileInfo: ProfileInfo;
  signinMethod: SigninMethod;
  accountSettings: AccountSettings;

  createdAt: Date;
  updatedAt?: Date;
  createdBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
};

export type PublicAccountModel = Omit<AccountModel, "accountSettings">;

export type Participant = PublicAccountModel & { isOwner?: boolean };
