import { FilterFolder } from "modules/folder/screens/FolderOverview/FolderOverviewScreen";
import { TaskStatus } from "modules/tasks/types/task.types";

export const ACTIVE_STATUSES: TaskStatus[] = [
	TaskStatus.InProgress,
	TaskStatus.Done,
	TaskStatus.NotStartYet,
	TaskStatus.Pending,
];


export const FILTER_FOLDER_OPTIONS: { key: FilterFolder; label: string }[] = [
    { key: "All", label: "All" },
    { key: "Favorites", label: "Favorites" },
    { key: "Shared", label: "Shared folders" },
    { key: "My", label: "My folders" },
  ];
