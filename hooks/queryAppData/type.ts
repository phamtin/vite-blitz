import type { FolderModel } from "modules/folder/types/folder.types";
import { TaskStatus } from "modules/tasks/types/task.types";

export type GetMyFoldersResponse = {
	folder: Exclude<FolderModel, "documents">;
	taskStats: {
		Total: number;
		[TaskStatus.NotStartYet]: number;
		[TaskStatus.InProgress]: number;
		[TaskStatus.Done]: number;
		[TaskStatus.Archived]: number;
	};
};
