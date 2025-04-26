import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const router = useRouter();
	const isLogin = router.options.context.isLogin;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!isLogin) {
			router.navigate({ to: "/login" });
		}
	}, [isLogin]);

	if (!isLogin) return null;

	return <>{children}</>;
}
