import { ConfigProvider, message, type ThemeConfig } from "antd";
import { Green, Red, Blue, Yellow, Orange } from "./styles/colors";
import { lazy, Suspense, type PropsWithChildren, type ReactNode } from "react";
import { handleReactQueryError } from "utils/response";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

const theme: ThemeConfig = {
	token: {
		colorPrimary: Orange[500],
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

const ReactQueryDevtools =
	process.env.NODE_ENV === "development" &&
	lazy(() =>
		import("@tanstack/react-query-devtools/build/modern/production.js").then(
			(d) => ({ default: d.ReactQueryDevtools }),
		),
	);

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
		queryCache: new QueryCache({
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			onError: (error: any, query) => {
				handleReactQueryError(query, error, cbNoti);
			},
		}),
		mutationCache: new MutationCache({
			onError: (error, variables, context, mutation) => {
				handleReactQueryError(mutation, error, cbNoti);
			},
		}),
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

				{process.env.NODE_ENV === "development" && (
					<Suspense fallback={null}>
						{ReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
					</Suspense>
				)}
			</QueryClientProvider>
		</ConfigProvider>
	);
};

export default App;
