import { createLazyFileRoute } from "@tanstack/react-router";
import AppLayout from "layouts/AppLayout/AppLayout";
import { ProtectedRoute } from "layouts/ProtectedLayout/ProtectedRoute";
import FolderOverviewScreen from "modules/folder/screens/FolderOverview/FolderOverviewScreen";

export const Route = createLazyFileRoute("/folders/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ProtectedRoute>
			<AppLayout>
				<FolderOverviewScreen />
			</AppLayout>
		</ProtectedRoute>
	);
}
