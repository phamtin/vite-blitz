import type { AccountModel } from "modules/account/types/account.types";
import type { FolderModel } from "../modules/folder/types/folder.types";
import type { SidebarWidth, Theme } from "../types/app.type";

type LoggedInUser = Pick<AccountModel, "_id" | "profileInfo" | "accountSettings"> & {
	jwt: string;
};

type AppState = {
	auth: {
		currentLoggedInUser?: LoggedInUser;
	};
	ui: {
		sidebarWidth: SidebarWidth;
	};
	settings: {
		theme: Theme;
	};
	folders: {
		list: FolderModel[];
		activeFolder: FolderModel | null;
	};

	setCurrentUser: (data: any) => void;
	isAuthenticated: () => boolean;
	setFolders: (folders: FolderModel[]) => void;
	setActiveFolder: (id: string) => void;
	changeSidebarWidth: (sidebarWidth: SidebarWidth) => void;
	logout: () => void;
};

export type { AppState, LoggedInUser };
