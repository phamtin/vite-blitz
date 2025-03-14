import { createLazyFileRoute } from "@tanstack/react-router";
import ProfileScreen from "modules/account/screen/ProfileScreen/ProfileScreen";

function Profile() {
  return <ProfileScreen />;
}

export const Route = createLazyFileRoute("/profile/profile")({
  component: Profile,
});
