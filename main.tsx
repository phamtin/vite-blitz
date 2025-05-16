import "@ant-design/v5-patch-for-react-19";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import useAppState from "store/index.ts";
import App from "./App";
import "./index.css";
import ErrorPage from "./layouts/ErrorPage/ErrorPage.tsx";
import { routeTree } from "./routeTree.gen";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createRouter({
	routeTree,
	defaultNotFoundComponent: () => <ErrorPage code={404} message="Page not found" />,
	context: {
		isLogin: false,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
		context: {
			isLogin: boolean;
		};
	}
}

function RouterWrapper() {
	const isAuthenticated = useAppState((s) => s.isAuthenticated);

	return (
		<RouterProvider router={router} context={{ isLogin: isAuthenticated?.() }} />
	);
}

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
				<App>
					<RouterWrapper />
				</App>
			</GoogleOAuthProvider>
		</StrictMode>,
	);
}
