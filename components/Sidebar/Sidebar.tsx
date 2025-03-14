import type { Key, MouseEventHandler, ReactNode } from "react";
import { Badge, Button, Flex, Menu, type MenuProps, Typography } from "antd";
import {
  ChartPieIcon,
  PresentationChartBarIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  ChevronDoubleLeftIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
import type { SidebarWidth } from "types/app.type";
import { useNavigate, useRouter } from "@tanstack/react-router";
import type { MenuItemType } from "antd/es/menu/interface";
import useStyles from "./sidebar.style";
import { useQueryClient } from "@tanstack/react-query";
import useAppState from "store";
import type { CreateTaskResponse } from "modules/tasks/types/task.types";
import api from "api/api";
import type { ProjectModel } from "modules/project/types/project.types";

const getItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItemType[],
  type?: "group",
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onMouseEnter?: any
): MenuItemType => {
  return { key, icon, children, label, type, onMouseEnter } as MenuItemType;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const items = (onmouseenterCb: any): MenuItemType[] => {
  return [
    getItem(
      "Dashboard",
      "/home",
      <ChartPieIcon width={18} style={{ marginLeft: -3 }} />
    ),
    getItem(
      "Tasks",
      "/tasks",
      <DocumentCheckIcon width={18} style={{ marginLeft: -3 }} />,
      undefined,
      undefined,
      onmouseenterCb
    ),
    getItem(
      "Meetings",
      "/meetings",
      <PresentationChartBarIcon width={18} style={{ marginLeft: -3 }} />
    ),

    getItem(
      "Statistics",
      "sub1",
      <ChartBarIcon width={18} style={{ marginLeft: -3 }} />,
      [
        getItem("Option 5", "5", <Badge color="yellow" />),
        getItem("Option 6", "6", <Badge color="orange" />),
        getItem("Option 7", "7", <Badge color="cyan" />),
        getItem("Option 8", "8", <Badge color="blue" />),
      ]
    ),

    getItem(
      "SEO management",
      "sub2",
      <HashtagIcon width={18} style={{ marginLeft: -3 }} />,
      [
        getItem("Option 9", "9", <Badge color="green" />),
        getItem("Option 10", "10", <Badge color="lime" />),

        getItem("Submenu", "sub3", null, [
          getItem("Option 11", "11"),
          getItem("Option 12", "12"),
        ]),
      ]
    ),
  ];
};

const getActivekey = (path: string) => {
  const keys: Record<string, string> = {
    "/home": "/home",
    "/tasks": "/tasks",
    "/meetings/": "/meetings",
  };
  if (path.startsWith(keys[path])) {
    return keys[path];
  }
  return "";
};

interface SidebarProps {
  width: SidebarWidth;
  setWidth: (width: SidebarWidth) => void;
}
const Sidebar = ({ width, setWidth }: SidebarProps) => {
  const { styles, theme } = useStyles({ sidebarWidth: width });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const path = useRouter().parseLocation().pathname;
  const activeProject = useAppState(
    (state) => state.projects.activeProject
  ) as ProjectModel;

  const isExpanded = width === "220px";

  const goToHome = () => {};

  const onToggleSizebar = () => {
    if (isExpanded) {
      return setWidth("54px");
    }
    return setWidth("220px");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    navigate({ to: e.key });
  };

  const onMouseEnter = () => {
    //  todo: should not use this hack
    queryClient.prefetchQuery({
      queryKey: ["getTasks", activeProject._id, ""],
      queryFn: () => {
        return api.get(`tasks?projectId=${activeProject._id}&query=`).json();
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className="sidebarTop">
        <Flex align="center" className="sidebarTop__logo" onClick={goToHome}>
          <Typography.Title level={2}>🧭 </Typography.Title>
          {isExpanded && (
            <>
              &nbsp;&nbsp;<h4>Blitz</h4>
            </>
          )}
        </Flex>
      </div>
      <div className="sidebarMid">
        <Menu
          style={{
            width,
            height: "100% ",
            paddingTop: theme.paddingXS,
            paddingLeft: 2,
            paddingRight: 1,
            backgroundColor: theme.colorTextBase,
          }}
          selectedKeys={[path]}
          defaultSelectedKeys={["/home"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={!isExpanded}
          items={items(onMouseEnter)}
          onClick={onClick}
        />
      </div>
      <div className="sidebarBot">
        <Button
          size="large"
          icon={<ChevronDoubleLeftIcon width={22} />}
          onClick={onToggleSizebar}
        />
      </div>
    </div>
  );
};

export default Sidebar;
