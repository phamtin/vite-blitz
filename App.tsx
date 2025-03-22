import { ConfigProvider, notification, type ThemeConfig } from "antd";

import { Green, Red, Blue, Yellow, Orange, Sky } from "./styles/colors";
import type { PropsWithChildren, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme: ThemeConfig = {
  token: {
    motion: false,
    colorPrimary: Sky[600],
    colorInfo: Blue["500"],
    colorSuccess: Green["500"],
    colorWarning: Yellow["500"],
    colorError: Red["500"],
    fontSize: 13,
    borderRadius: 8,
  },
  components: {
    Button: {
      fontWeight: 500,
    },
  },
};

const queryClient = (cbNoti: (type: "error", msg: string) => void) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000, //  1 minute
      },
      mutations: {
        onError(error, variables, context) {
          cbNoti("error", error.message);
        },
      },
    },
  });
};

const App = ({ children }: PropsWithChildren) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: "error", msg: ReactNode) => {
    api[type]({
      message: "Ops!",
      description: msg,
    });
  };

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <QueryClientProvider client={queryClient(openNotificationWithIcon)}>
        {children}
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
