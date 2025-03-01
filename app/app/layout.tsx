"use client";

import { useSession } from "@/components/session-provider";
import { useRouter } from "next/navigation";

export default function AppLayout(props: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();

  if (session.isPending) return null;

  if (!session.data) return router.push("/auth/login");

  return props.children;
}
