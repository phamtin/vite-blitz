import api from "../../../api/api";
import { useMutation } from "@tanstack/react-query";
import type { CreateTaskRequest, UpdateTaskRequest } from "../types/task.types";

type CreateTaskProps = {
	onClose?: (refetch: boolean) => void;
};
const useCreateTask = (props: CreateTaskProps) => {
	const mutationCreateTask = useMutation({
		mutationFn: (newTask: CreateTaskRequest) => {
			return api.post("tasks/create", { json: newTask }).json();
		},
		onSuccess: () => {
			props.onClose?.(true);
		},
	});

	return { mutationCreateTask };
};

type UpdateTaskProps = {
	taskId: string;
	onClose?: (refetch: boolean) => void;
};
const useUpdateTask = (props: UpdateTaskProps) => {
	const mutationUpdateTask = useMutation({
		mutationFn: (request: UpdateTaskRequest) => {
			return api.patch(`tasks/${props.taskId}`, { json: request }).json();
		},
		onSuccess: () => {
			props.onClose?.(true);
		},
	});

	return { mutationUpdateTask };
};

const TaskApi = { useCreateTask, useUpdateTask };

export default TaskApi;
