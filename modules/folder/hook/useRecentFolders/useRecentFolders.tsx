import { useState } from "react";

const VISIT_FOLDERS_KEY = "VISIT_FOLDERS_KEY";

type Props = {
	folderIds: string[];
};

function useSortRecentFolders(props: Props) {
	const { folderIds } = props;

	const [_, setVisitCount] = useState(0); // Force rerender for localStorage changes

	const getVisitTimestamps = (): Record<string, number> => {
		const storedData = localStorage.getItem(VISIT_FOLDERS_KEY);
		return storedData ? JSON.parse(storedData) : {};
	};

	const saveVisitTimestamps = (timestamps: Record<string, number>) => {
		localStorage.setItem(VISIT_FOLDERS_KEY, JSON.stringify(timestamps));
	};

	const handleVisitFolder = (folderId: string) => {
		const now = Date.now();
		const currentTimestamps = getVisitTimestamps();

		const existingTime = currentTimestamps[folderId];
		const timeDiff = Math.abs(now - (existingTime || 0));

		if (!existingTime || timeDiff > 1000) {
			const updatedTimestamps = {
				...currentTimestamps,
				[folderId]: now,
			};
			saveVisitTimestamps(updatedTimestamps);
			setVisitCount((prev) => prev + 1);
		}
	};

	const sortedFolders = () => {
		const visitTimestamps = getVisitTimestamps();

		return [...folderIds].sort((a, b) => {
			const timeA = visitTimestamps[a] || 0;
			const timeB = visitTimestamps[b] || 0;
			return timeB - timeA;
		});
	};

	return {
		sorted: sortedFolders,
		handleVisitFolder,
	};
}

export default useSortRecentFolders;
