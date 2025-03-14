import type { Participant } from "modules/account/types/account.types";
import useAppState from "store/index";

const useGetParticipants = () => {
  const activeProject = useAppState((state) => state.projects.activeProject);

  if (!activeProject) {
    return [];
  }
  const { participantInfo } = activeProject;
  let participants: Participant[] = [];

  participants = participants
    .concat(participantInfo.members)
    .concat([participantInfo.owner]);

  return participants;
};

const ProjectHook = { useGetParticipants };

export { ProjectHook };
