import useAppState from "store/index";
import { useGetMyFolders } from "modules/folder/api/folder.api";
import type { GetMyFoldersResponse } from "./type";

const useQueryAppData = (enabled?: boolean) => {
	const {
		data = [],
		isSuccess,
		isLoading: isLoadingFolders,
	} = useGetMyFolders<GetMyFoldersResponse[]>({ enabled });

	const activeFolder = useAppState((state) => state.folders.activeFolder);
	const setFolderList = useAppState((state) => state.setFolders);
	const setActiveFolder = useAppState((state) => state.setActiveFolder);

	if (isSuccess && !data.length) {
		throw new Error("Active Folder not found");
	}

	if (isSuccess && data.length > 0) {
		setFolderList(data.map((f) => f.folder));
		setActiveFolder(activeFolder?._id ?? data[0].folder._id);
	}

	const isDone = !isLoadingFolders && data.length > 0;

	return { isDone };
};

export { useQueryAppData };
