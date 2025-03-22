import type { AccountModel } from "../../account/types/account.types";
import type { AttributePattern } from "../../../types/app.type";
import type { DefaultOptionType } from "antd/es/select";

export type TaskTiming = {
	startDate?: Date;
	endDate?: Date;
	estimation?: string;
};

export enum TaskPriority {
	Critical = "Critical",
	High = "High",
	Medium = "Medium",
	Low = "Low",
}

export enum TaskStatus {
	NotStartYet = "NotStartYet",
	InProgress = "InProgress",
	Pending = "Pending",
	Done = "Done",
	Archived = "Archived",
}

export enum PodomoroType {
	"25-5" = "25-5",
	"50-10" = "50-10",
}

export type Podomoro = {
	quantity: number;
	type: PodomoroType;
};

/**
 *  -----------------------------
 *	|
 * 	| Mongo Model - Task
 *	|
 * 	-----------------------------
 */
export type TaskModel = {
	_id: string;

	title: string;
	status: TaskStatus;
	projectId: string;
	description?: string;
	priority?: TaskPriority;
	assigneeInfo?: Omit<AccountModel, "accountSettings">[];
	additionalInfo?: AttributePattern[];
	timing: TaskTiming;
	subTasks?: SubTask[];
	tags?: string[];

	createdAt: Date;
	createdBy?: string;
	updatedAt?: Date;
	deletedAt?: Date;
	deletedBy?: string;
};

export type ExtendTaskModel = {
	created?: Omit<AccountModel, "accountSettings">;
	availableTags?: { _id: string; name: string; color: string }[];
};

export type SubTask = Pick<
	TaskModel,
	"_id" | "title" | "description" | "priority" | "additionalInfo"
> & { status?: TaskStatus };

/**
 *  -----------------------------
 *	|
 * 	| Type Shit here!
 *	|
 * 	-----------------------------
 */

export type TaskMetadataForDropdown = {
	status: DefaultOptionType[];
	priorities: DefaultOptionType[];
	tags: DefaultOptionType[];
};
export type TaskMetadata =
	| TaskMetadataForDropdown
	| {
			status: TaskStatus[];
			priorities: TaskPriority[];
			tags:
				| {
						_id: string;
						color: string;
						name: string;
				  }[]
				| undefined;
	  };

export type CreateTaskRequest = {
	title: string;
	projectId: string;
	description?: string;
	status?: TaskStatus;
	assigneeId?: string;
	timing: {
		startDate?: string;
		endDate?: string;
		estimation?: string;
	};
	priority?: TaskPriority;
	additionalInfo?: AttributePattern[];
	subTasks?: SubTask[];
	tags?: string[];
};

export type UpdateTaskRequest = {
	title?: string;
	description?: string;
	status?: TaskStatus;
	assigneeId?: string;
	priority?: TaskPriority;
	timing?: {
		startDate?: string;
		endDate?: string;
		estimation?: string;
	};
	additionalInfo?: AttributePattern[];
	subTasks?: {
		_id?: string;
		title: string;
		description?: string;
		priority?: TaskPriority;
		additionalInfo?: AttributePattern[];
		status?: TaskStatus;
	}[];
	tags?: string[];
};

export type CreateTaskResponse = { data: TaskModel[] };
