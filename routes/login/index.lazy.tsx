import { createLazyFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import SigninScreen from "modules/auth/screen/SigninScreen/SigninScreen";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const isLogin = router.options.context.isLogin;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isLogin) {
			router.navigate({ to: "/home" });
		}
	}, [isLogin]);

	if (isLogin) return <Outlet />;

	return (
		<AuthLayout>
			<SigninScreen />
		</AuthLayout>
	);
}
