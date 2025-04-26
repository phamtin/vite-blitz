import { ConfigProvider, message, type ThemeConfig } from "antd";

import { Green, Red, Blue, Yellow, Sky } from "./styles/colors";
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
				// throwOnError: true,
			},
			mutations: {
				onError(error, variables, context) {
					cbNoti("error", error.message);
				},
				// throwOnError: true,
			},
		},
	});
};

const App = ({ children }: PropsWithChildren) => {
	const [messageApi, contextHolder] = message.useMessage();

	const openNotificationWithIcon = (type: "error", msg: ReactNode) => {
		messageApi[type](msg);
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
