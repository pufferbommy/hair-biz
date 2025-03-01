"use client";

import { useSession } from "@/components/session-provider";
import { useRouter } from "next/navigation";

export default function AuthLayout(props: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = useSession();

  if (session.isPending) return "กำลังโหลด...";

  if (session.data) return router.push("/app/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-xs w-full space-y-8">{props.children}</div>
    </div>
  );
}
