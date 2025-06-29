export enum InviteJoinFolderPayloadStatus {
	Active = "Active",
	Declined = "Declined",
	Accepted = "Accepted",
	Expired = "Expired",
}

export enum NotificationType {
	InviteJoinFolder = "InviteJoinFolder",
	AssignedTaskForYou = "AssignedTaskForYou",
	RemindImportantTasks = "RemindImportantTasks",
	WeeklyStats = "WeeklyStats",
	MonthlyStats = "MonthlyStats",
}

export type GetMyNotificationResponse =
	| NotificationAssignedTaskForYou
	| NotificationInviteJoinFolder;

export type NotificationAssignedTaskForYou = {
	_id: string;
	title: string;
	type: NotificationType.AssignedTaskForYou;
	payload: {
		taskId: string;
		assigneeId: string;
		assigneeEmail: string;
		title: string;
		assignerId: string;
		assignerAvatar: string;
		assignerUsername: string;
		folderId: string;
		folderName: string;
	};
	accountId: string;
	read: boolean;
	createdAt: string;
};

export type NotificationInviteJoinFolder = {
	_id: string;
	title: string;
	type: NotificationType.InviteJoinFolder;
	accountId: string;
	payload: {
		status: InviteJoinFolderPayloadStatus;
		folderId: string;
		folderName: string;
		inviteeEmail: string;
		inviteeUsername: string;
		invitorId: string;
		invitorEmail: string;
		invitorAvatar: string;
		invitorUsername: string;
	};
	createdAt: string;
	read: boolean;
};
