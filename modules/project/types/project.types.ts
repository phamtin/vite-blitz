import type { AttributePattern } from "../../../types/app.type";
import type { AccountModel } from "../../account/types/account.types";

export type ProjectDocument = {
  urls: AttributePattern[];
};

export enum ProjectStatus {
  Planning = "Planning",
  InProgress = "InProgress",
  Done = "Done",
  Archived = "Archived",
}

export type ProjectInfo = {
  title: string;
  color: string;
  status: ProjectStatus;
  isDefaultProject: boolean;
  description?: string;
  dueDate?: Date;
};

export type ProjectParticipant = {
  owner: Omit<AccountModel, "accountSettings">;
  members: Omit<AccountModel, "accountSettings">[];
};

/**
 *  -----------------------------
 *	|
 * 	| Mongo Model - Project
 *	|
 * 	-----------------------------
 */

export type ProjectModel = {
  _id: string;

  projectInfo: ProjectInfo;
  participantInfo: ProjectParticipant;
  documents: ProjectDocument;
  tags?: { _id: string; color: string; name: string }[];

  createdAt: Date;
  createdBy?: string;
  updatedAt?: Date;
  deletedAt?: Date;
  deletedBy?: string;
};
