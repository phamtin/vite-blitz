import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "layouts/ProtectedLayout/ProtectedRoute";
import TaskDetailScreen from "modules/tasks/screen/TaskDetailScreen/TaskDetailScreen";

export const Route = createLazyFileRoute("/tasks/$taskId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProtectedRoute>
    <TaskDetailScreen taskId="123" />;
  </ProtectedRoute>
}
