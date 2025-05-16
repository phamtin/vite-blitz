import useAppState from "store/index";
import type { FolderModel } from "modules/folder/types/folder.types";
import { useGetMyFolders } from "modules/folder/api/folder.api";

const useQueryAppData = (enabled?: boolean) => {
	const {
		data: folders = [],
		isSuccess,
		isLoading: isLoadingFolders,
	} = useGetMyFolders<FolderModel[]>({ enabled });

	const activeFolder = useAppState((state) => state.folders.activeFolder);
	const setFolderList = useAppState((state) => state.setFolders);
	const setActiveFolder = useAppState((state) => state.setActiveFolder);

	if (isSuccess && !folders.length) {
		throw new Error("Active Folder not found");
	}

	if (isSuccess && folders.length > 0) {
		setFolderList(folders);
		setActiveFolder(activeFolder?._id ?? folders[0]._id);
	}

	const isDone = !isLoadingFolders && folders.length > 0;

	return { isDone };
};

export { useQueryAppData };
