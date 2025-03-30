import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="authlayout-wrapper">{children}</div>;
};

export default AuthLayout;
