import { createLazyFileRoute } from "@tanstack/react-router";
import TaskDetailScreen from "modules/tasks/screen/TaskDetailScreen/TaskDetailScreen";

export const Route = createLazyFileRoute("/tasks/$taskId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TaskDetailScreen taskId="123" />;
}
