"use client";

import { useSession } from "@/components/session-provider";
import { useRouter } from "next/navigation";

export default function AppLayout(props: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();

  if (session.data?.user.isOnboarded) return router.push("/app/dashboard");

  return props.children;
}
