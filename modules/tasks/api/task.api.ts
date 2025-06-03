import api from "../../../api/api";
import {
	useMutation,
	useQuery,
	useQueryClient,
	type UseQueryOptions,
} from "@tanstack/react-query";
import type {
	CreateTaskRequest,
	TaskPriority,
	TaskStatus,
	UpdateTaskRequest,
} from "../types/task.types";
import queryString from "query-string";
import type { TaskModel } from "../types/task.types";
import type { Ok } from "types/response.type";

type UseGetTasksProps = {
	folderIds: string[];
	query?: string;
	tags?: string[];
	endDate?: string[];
	startDate?: string[];
	status?: TaskStatus[];
	priorities?: TaskPriority[];
	fields?: (keyof TaskModel)[];
	isMine?: boolean;
} & Omit<UseQueryOptions<Ok<TaskModel[]>>, "queryKey" | "queryFn">;

const useGetTasks = ({
	folderIds,
	query = "",
	startDate,
	endDate,
	tags,
	priorities,
	status,
	fields,
	isMine,
	...useQueryOptions
}: UseGetTasksProps) => {
	const queryKeys = {
		query,
		startDate,
		endDate,
		isMine,
		fields,
		tags: tags?.length === 1 ? tags.concat(tags[0]) : tags,
		status: status?.length === 1 ? status.concat(status[0]) : status,
		folderIds: folderIds.length === 1 ? folderIds.concat(folderIds[0]) : folderIds,
		priorities:
			priorities?.length === 1 ? priorities.concat(priorities[0]) : priorities,
	};
	return useQuery({
		...useQueryOptions,
		queryKey: ["useGetTasks", queryKeys],

		queryFn: ({ signal }) => {
			const paramsObject: Record<string, string | string[] | unknown> = {
				folderIds: queryKeys.folderIds,
				priorities: queryKeys.priorities,
				status: queryKeys.status,
				tags: queryKeys.tags,
			};

			if (query) paramsObject.query = query;

			if (startDate) paramsObject.startDate = startDate;

			if (endDate) paramsObject.endDate = endDate;

			if (isMine) paramsObject.isMine = isMine;

			if (fields?.length) paramsObject.select = fields;

			const res: Promise<Ok<TaskModel[]>> = api
				.get(`tasks?${queryString.stringify(paramsObject)}`, { signal })
				.json();
			return res;
		},
		select: (res) => res.data,
	});
};

type CreateTaskProps = {
	onClose?: (refetch: boolean) => void;
};
const useCreateTask = (props: CreateTaskProps) => {
	const queryClient = useQueryClient();

	const mutationCreateTask = useMutation({
		mutationFn: (newTask: CreateTaskRequest) => {
			return api.post("tasks/create", { json: newTask }).json();
		},
		onSuccess: () => {
			props.onClose?.(true);
			queryClient.invalidateQueries({ queryKey: ["useGetMyFolders"] });
		},
	});

	return { mutationCreateTask };
};

type UpdateTaskProps = {
	taskId: string;
	onClose?: (refetch: boolean) => void;
};
const useUpdateTask = (props: UpdateTaskProps) => {
	const queryClient = useQueryClient();

	const mutationUpdateTask = useMutation({
		mutationFn: (request: UpdateTaskRequest) => {
			return api.patch(`tasks/${props.taskId}`, { json: request }).json();
		},
		onSuccess: () => {
			props.onClose?.(true);
			queryClient.invalidateQueries({ queryKey: ["useGetMyFolders"] });
		},
	});

	return { mutationUpdateTask };
};

const TaskApi = { useGetTasks, useCreateTask, useUpdateTask };

export default TaskApi;
