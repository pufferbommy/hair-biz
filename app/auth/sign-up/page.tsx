"use client";

import { toast } from "@/hooks/use-toast";
import { signUp, useSession } from "@/lib/auth-client";
import {
  type Register,
  SignUpForm,
} from "@/modules/auth/components/sign-up-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data } = useSession();

  // need to fix
  if (data) {
    router.push("/app/dashboard");
  }

  const handleSubmit = async (values: Register) => {
    setIsSubmitting(true);

    const { error } = await signUp.email({
      name: "",
      email: values.email,
      password: values.password,
      image: undefined,
    });

    if (error) {
      const errorMessages: Record<string, string> = {
        USER_ALREADY_EXISTS: "อีเมลนี้มีผู้ใช้งานแล้ว",
      };
      toast({
        title: "เกิดข้อผิดพลาด",
        description:
          errorMessages[error.code as string] || "เกิดข้อผิดพลาดที่ไม่คาดคิด",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: "สมัครสมาชิกสำเร็จ",
    });
    router.push("/app/dashboard");
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">สมัครสมาชิก</h1>
      <SignUpForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <div className="text-center text-sm">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          เข้าสู่ระบบ
        </Link>
      </div>
    </>
  );
}
