import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ProjectModel } from "modules/project/types/project.types";
import type { SidebarWidth } from "../types/app.type";
import type { AppState, LoggedInUser } from "./store.type";
import type { AccountModel } from "modules/account/types/account.types";

/**
 *  ------------------------------------------------
 *                  App level states
 *  ------------------------------------------------
 */

const useAppState = create<AppState>()(
	persist(
		mutative((set, get) => ({
			auth: {
				currentLoggedInUser: undefined,
			},
			ui: {
				sidebarWidth: "220px",
			},
			projects: {
				list: [],
				activeProject: null,
			},
			settings: {
				theme: "light",
			},

			setCurrentUser: (data: LoggedInUser | undefined) => {
				set((state) => {
					state.auth.currentLoggedInUser = data;
				});
			},
			isAuthenticated: () => {
				const jwt = (get().auth.currentLoggedInUser as LoggedInUser)?.jwt;
				return !!jwt;
			},
			setProjects: (projects: ProjectModel[] = []) => {
				set((state) => {
					state.projects.list = projects;
				});
			},
			setActiveProject: (id: string) => {
				const activeProject = get().projects.list.find((p) => p._id === id);
				if (!activeProject) {
					throw new Error("Project not found");
				}
				set((state) => {
					state.projects.activeProject = activeProject;
				});
			},
			changeSidebarWidth: (sidebarWidth: SidebarWidth) => {
				set((state) => {
					state.ui.sidebarWidth = sidebarWidth;
				});
			},
			logout: () => {
				set(() => ({
					auth: { currentLoggedInUser: undefined },
				}));
			},
		})),
		{
			name: "app",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useAppState;
