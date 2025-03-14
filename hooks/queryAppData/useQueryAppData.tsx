import useAppState from "store/index";
import type { ProjectModel } from "modules/project/types/project.types";
import { useGetMyProjects } from "modules/project/api/project.api";

const useQueryAppData = (enabled?: boolean) => {
  const {
    data: projects = [],
    isSuccess,
    isLoading: isLoadingProjects,
  } = useGetMyProjects<ProjectModel[]>({ enabled });

  const activeProject = useAppState((state) => state.projects.activeProject);
  const setProjectList = useAppState((state) => state.setProjects);
  const setActiveProject = useAppState((state) => state.setActiveProject);

  if (isSuccess && projects.length > 0) {
    setProjectList(projects);
    setActiveProject(activeProject?._id ?? projects[0]._id);
  }

  const isDone = !isLoadingProjects && projects.length > 0;

  return { isDone };
};

export { useQueryAppData };
