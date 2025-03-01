"use client";

import { authClient } from "@/lib/auth-client";
import {
  type Register,
  RegisterForm,
} from "@/modules/auth/components/register-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: Register) => {
    setIsSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: values.name || values.email.replace(/@.*/, ""),
      email: values.email,
      password: values.password,
      image: undefined,
      isOnboarded: false,
    });

    if (error) {
      const errorMessages: Record<string, string> = {
        USER_ALREADY_EXISTS: "อีเมลนี้มีผู้ใช้งานแล้ว",
      };
      toast(errorMessages[error.code as string]);
      setIsSubmitting(false);
      return;
    }

    toast("สมัครสมาชิกสำเร็จ");
    router.push("/app/dashboard");
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">สมัครสมาชิก</h1>
      <RegisterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <div className="text-center text-sm">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          เข้าสู่ระบบ
        </Link>
      </div>
    </>
  );
}
