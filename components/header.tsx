"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
  const { data, isPending } = useSession();

  return (
    <header className="py-4 sticky z-10 top-0 bg-background border-b border-b-primary/10">
      <div className="container flex justify-between items-center">
        <Link href="/" className="font-bold font-mono">
          HairBiz
        </Link>
        <nav>
          <ul className="flex gap-2">
            {isPending ? (
              <li>
                <Skeleton className="h-9 w-[105.17px] rounded-lg" />
              </li>
            ) : data ? (
              <li>
                <Button asChild>
                  <Link href="/admin/dashboard">ไปยังแอป</Link>
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">เข้าสู่ระบบ</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild>
                    <Link href="/auth/sign-up">สมัครสมาชิก</Link>
                  </Button>
                </li>
              </>
            )}
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
