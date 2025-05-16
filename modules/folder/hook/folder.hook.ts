import type { Participant } from "modules/account/types/account.types";
import useAppState from "store/index";

const useGetParticipants = () => {
	const activeFolder = useAppState((state) => state.folders.activeFolder);

	if (!activeFolder) {
		return [];
	}
	const { participantInfo } = activeFolder;
	let participants: Participant[] = [];

	participants = participants
		.concat(participantInfo.members)
		.concat([participantInfo.owner]);

	return participants;
};

const FolderHook = { useGetParticipants };

export { FolderHook };
