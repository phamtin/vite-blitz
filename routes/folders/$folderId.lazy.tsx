import { createLazyFileRoute } from '@tanstack/react-router';
import AppLayout from 'layouts/AppLayout/AppLayout';
import { ProtectedRoute } from 'layouts/ProtectedLayout/ProtectedRoute';
import FolderDetailScreen from 'modules/folder/screens/FolderDetailScreen/FolderDetailScreen';

export const Route = createLazyFileRoute('/folders/$folderId')({
	component: RouteComponent,
});

function RouteComponent() {
	const param = Route.useParams();
	return (
		<ProtectedRoute>
			<AppLayout>
				<FolderDetailScreen folderId={param.folderId} />
			</AppLayout>
		</ProtectedRoute>
	);
}
