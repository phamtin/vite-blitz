import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "layouts/ProtectedLayout/ProtectedRoute";
import HomeScreen from "modules/home/screen/HomeScreen/HomeScreen";
import AppLayout from "../layouts/AppLayout/AppLayout";

export const Route = createLazyFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <HomeScreen />
      </AppLayout>
    </ProtectedRoute>
  );
}
