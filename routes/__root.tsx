import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
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

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <AppLayout> */}
      <Outlet />
      {/* </AppLayout> */}
      {/* <Suspense>
        <TanStackRouterDevtools />
      </Suspense> */}
    </>
  ),
  notFoundComponent: () => <ErrorPage code={404} message="Page not found" />,
});
