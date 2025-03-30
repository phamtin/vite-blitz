import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "layouts/ProtectedLayout/ProtectedRoute";
import ProfileScreen from "modules/account/screen/ProfileScreen/ProfileScreen";

function Profile() {
  return <ProtectedRoute>
    <ProfileScreen />;
  </ProtectedRoute>
}

export const Route = createLazyFileRoute("/profile/profile")({
  component: Profile,
});
