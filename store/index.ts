import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FolderModel } from "modules/folder/types/folder.types";
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
			folders: {
				list: [],
				activeFolder: null,
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
			setFolders: (folders: FolderModel[] = []) => {
				set((state) => {
					state.folders.list = folders;
				});
			},
			setActiveFolder: (id: string) => {
				const activeFolder = get().folders.list.find((p) => p._id === id);
				if (!activeFolder) {
					throw new Error("Folder not found");
				}
				set((state) => {
					state.folders.activeFolder = activeFolder;
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
