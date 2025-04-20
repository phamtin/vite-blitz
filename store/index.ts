import type { ProjectModel } from "modules/project/types/project.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { SidebarWidth } from "../types/app.type";
import type { AppState } from "./store.type";

/**
 *  ------------------------------------------------
 *                  App level states
 *  ------------------------------------------------
 */

const useAppState = create<AppState>()(
  persist(
    (set, get) => ({
      auth: {
        currentLoggedInUser: {},
      },
      settings: {
        theme: "light",
      },
      ui: {
        sidebarWidth: "220px",
      },
      projects: {
        list: [],
        activeProject: null,
      },

      changeSidebarWidth: (sidebarWidth: SidebarWidth) => {
        set((state) => ({
          ui: { ...state.ui, sidebarWidth },
        }));
      },
      setProjects: (projects: ProjectModel[]) => {
        set((state) => ({
          projects: { ...state.projects, list: projects },
        }));
      },
      setActiveProject: (id: string) => {
        const activeProject = get().projects.list.find((p) => p._id === id);
        if (!activeProject) {
          throw new Error("Project not found");
        }

        set((state) => ({
          projects: { ...state.projects, activeProject },
        }));
      },
      setCurrentUser: (data: any) => {
        set((state) => ({
          auth: {...state.auth, currentLoggedInUser: data}
        }))
      },
      isAuthenticated: () => {
        const user = get().auth.currentLoggedInUser;
        return !!user && Object.keys(user).length > 0;
      },
      logout: () => {
        set(() => (
          {
            auth: {
              currentLoggedInUser: {},
            },
          }
        ))
      },
    }),
    {
      name: "app",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAppState;
