import { createLazyFileRoute } from "@tanstack/react-router";
import AppLayout from "../layouts/AppLayout/AppLayout";
import HomeScreen from "modules/home/screen/HomeScreen/HomeScreen";

export const Route = createLazyFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout>
      <HomeScreen />
    </AppLayout>
  );
}
