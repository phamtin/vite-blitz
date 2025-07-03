import type { TaskPriority, TaskStatus } from 'modules/tasks/types/task.types';
import type { AttributePattern } from '../../../types/app.type';
import type { AccountModel } from '../../account/types/account.types';

export type FolderDocument = {
	urls: AttributePattern[];
};

export enum FolderStatus {
	Planning = 'Planning',
	InProgress = 'InProgress',
	Done = 'Done',
	Archived = 'Archived',
}

export type FolderInfo = {
	title: string;
	color: string;
	status: FolderStatus;
	isDefaultFolder: boolean;
	description?: string;
};

export type FolderInvitation = {
	title: string;
	inviteeEmail: string;
	inviteeAvatar: string;
	inviteeUsername: string;
	description?: string;
	expiredAt: Date;
	createdAt: Date;
};

export type FolderParticipant = {
	owner: Omit<AccountModel, 'accountSettings'>;
	members: Omit<AccountModel, 'accountSettings'>[];
	invitations: FolderInvitation[];
};

/**
 *  -----------------------------
 *	|
 * 	| Mongo Model - Folder
 *	|
 * 	-----------------------------
 */

export type FolderModel = {
	_id: string;

	folderInfo: FolderInfo;
	participantInfo: FolderParticipant;
	documents: FolderDocument;
	tags?: { _id: string; color: string; name: string }[];

	createdAt: Date;
	createdBy?: string;
	updatedAt?: Date;
	deletedAt?: Date;
	deletedBy?: string;
};

export type ExtendFolderModel = {
	taskStats: {
		Total: number;
		[TaskStatus.NotStartYet]: number;
		[TaskStatus.InProgress]: number;
		[TaskStatus.Pending]: number;
		[TaskStatus.Done]: number;
		[TaskPriority.Critical]: number;
		[TaskPriority.High]: number;
		[TaskPriority.Medium]: number;
		[TaskPriority.Low]: number;
	};
	timeStats: {
		Total: number;
		[TaskStatus.NotStartYet]: number;
		[TaskStatus.InProgress]: number;
		[TaskStatus.Pending]: number;
		[TaskStatus.Done]: number;
	};
};
