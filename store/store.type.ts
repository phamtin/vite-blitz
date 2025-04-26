import type { AccountModel } from "modules/account/types/account.types";
import type { ProjectModel } from "../modules/project/types/project.types";
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
	projects: {
		list: ProjectModel[];
		activeProject: ProjectModel | null;
	};

	setCurrentUser: (data: any) => void;
	isAuthenticated: () => boolean;
	setProjects: (projects: ProjectModel[]) => void;
	setActiveProject: (id: string) => void;
	changeSidebarWidth: (sidebarWidth: SidebarWidth) => void;
	logout: () => void;
};

export type { AppState, LoggedInUser };
