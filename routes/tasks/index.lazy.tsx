import { createLazyFileRoute } from "@tanstack/react-router";
import AppLayout from "layouts/AppLayout/AppLayout";
import TaskOverviewScreen from "modules/tasks/screen/TaskOverviewScreen/TaskOverviewScreen";

export const Route = createLazyFileRoute("/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <TaskOverviewScreen />
    </AppLayout>
  );
}
