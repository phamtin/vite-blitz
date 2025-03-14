import type { ProjectModel } from "../modules/project/types/project.types";
import type { SidebarWidth, Theme } from "../types/app.type";

type AppState = {
  auth: {
    currentLoggedInUser: Record<string, unknown>;
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

  changeSidebarWidth: (sidebarWidth: SidebarWidth) => void;
  setProjects: (projects: ProjectModel[]) => void;
  setActiveProject: (id: string) => void;
};

export type { AppState };
