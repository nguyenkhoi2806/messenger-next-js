"use client";

import { SessionProvider } from "next-auth/react";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = (props: AuthContextProps) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
