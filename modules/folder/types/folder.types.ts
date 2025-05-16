import type { AttributePattern } from "../../../types/app.type";
import type { AccountModel } from "../../account/types/account.types";

export type FolderDocument = {
	urls: AttributePattern[];
};

export enum FolderStatus {
	Planning = "Planning",
	InProgress = "InProgress",
	Done = "Done",
	Archived = "Archived",
}

export type FolderInfo = {
	title: string;
	color: string;
	status: FolderStatus;
	isDefaultFolder: boolean;
	description?: string;
	dueDate?: Date;
};

export type FolderParticipant = {
	owner: Omit<AccountModel, "accountSettings">;
	members: Omit<AccountModel, "accountSettings">[];
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
