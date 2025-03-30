import { createLazyFileRoute } from "@tanstack/react-router";
import AppLayout from "layouts/AppLayout/AppLayout";
import { ProtectedRoute } from "layouts/ProtectedLayout/ProtectedRoute";
import TaskOverviewScreen from "modules/tasks/screen/TaskOverviewScreen/TaskOverviewScreen";

export const Route = createLazyFileRoute("/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <TaskOverviewScreen />
      </AppLayout>
    </ProtectedRoute>
  );
}
