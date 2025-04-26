import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import ErrorPage from "../layouts/ErrorPage/ErrorPage.tsx";

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === "production"
//     ? () => null
//     : React.lazy(() =>
//         import("@tanstack/router-devtools").then((res) => ({
//           default: res.TanStackRouterDevtools,
//           // For Embedded Mode
//           // default: res.TanStackRouterDevtoolsPanel
//         }))
//       );

interface RouterContext {
	isLogin: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => <Outlet />,
	notFoundComponent: () => <ErrorPage code={404} message="Page not found" />,
});
