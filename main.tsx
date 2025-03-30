import "@ant-design/v5-patch-for-react-19";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import useAppState from "store/index.ts";
import App from "./App";
import "./index.css";
import ErrorPage from "./layouts/ErrorPage/ErrorPage.tsx";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <ErrorPage code={404} message="Page not found" />
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function RouterWrapper() {
  const isLogin = useAppState((s) => s.isAuthenticated)();
  return <RouterProvider
    router={router}
    context={{ isLogin }}
  />;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <App>
        <RouterWrapper />
      </App>
    </StrictMode>
  );
}
