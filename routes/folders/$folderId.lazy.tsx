import { createLazyFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "layouts/ProtectedLayout/ProtectedRoute";
import FolderDetailScreen from "modules/folder/screens/FolderDetailScreen/FolderDetailScreen";

export const Route = createLazyFileRoute("/folders/$folderId")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ProtectedRoute>
			<FolderDetailScreen folderId="123" />
		</ProtectedRoute>
	);
}
