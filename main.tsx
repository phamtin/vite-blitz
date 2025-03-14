import { StrictMode } from "react";
import ErrorPage from "./layouts/ErrorPage/ErrorPage.tsx";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import App from "./App";

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

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <App>
        <RouterProvider router={router} />
      </App>
    </StrictMode>
  );
}
