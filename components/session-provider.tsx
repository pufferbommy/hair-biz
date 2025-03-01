"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, useContext } from "react";

const SessionContext = createContext<ReturnType<typeof authClient.useSession>>({
  data: null,
  isPending: true,
  error: null,
  refetch: () => {},
});

export default function SessionProvider(props: {
  children: React.ReactNode;
}) {
  const session = authClient.useSession();

  return (
    <SessionContext.Provider value={session}>
      {props.children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
