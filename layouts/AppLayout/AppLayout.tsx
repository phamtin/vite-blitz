import { lazy, Suspense, type PropsWithChildren } from "react";
import Navbar from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";
import useAppState from "store/index";
import { useRouter } from "@tanstack/react-router";

import "./style.css";
import { useQueryAppData } from "hooks/queryAppData/useQueryAppData";
import SplashScreen from "modules/splash/screens/SplashScreen/SplashScreen";

const FloatButton = lazy(() => import("antd/es/float-button"));

const AppLayout = ({ children }: PropsWithChildren) => {
  const pathName = useRouter().parseLocation().pathname;
  if (pathName === "/") {
    window.location.replace("/home");
  }
  const { isDone } = useQueryAppData(pathName !== "/");
  const sidebarWidth = useAppState((state) => state.ui.sidebarWidth);
  const setWidebarWidth = useAppState((state) => state.changeSidebarWidth);

  const isOk = true;

  const widthContent =
    sidebarWidth === "220px" ? "calc(100vw - 220px)" : "calc(100vw - 54px)";

  const handleQuickAction = () => {};

  if (!isDone ) {
    return <SplashScreen />;
  }

  return (
    <div className="applayout-wrapper">
      <Sidebar width={sidebarWidth} setWidth={setWidebarWidth} />

      <div style={{ width: widthContent }}>
        <Navbar />
        <div className="main-content">{children}</div>
      </div>

      {isOk && (
        <Suspense fallback={null}>
          <FloatButton onClick={handleQuickAction} />
        </Suspense>
      )}
    </div>
  );
};

export default AppLayout;
