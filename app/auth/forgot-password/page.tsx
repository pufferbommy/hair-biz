"use client";

import { authClient } from "@/lib/auth-client";
import {
  type ForgotPassword,
  ForgotPasswordForm,
} from "@/modules/auth/components/forgot-password-form";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ForgotPassword) => {
    setIsSubmitting(true);

    const { error } = await authClient.forgetPassword({
      email: values.email,
      redirectTo: "/auth/reset-password",
    });

    console.log(error);

    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">ลืมรหัสผ่าน?</h1>
      <ForgotPasswordForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <div className="text-center">
        <Link
          href="/auth/login"
          className="underline text-sm underline-offset-4"
        >
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    </>
  );
}
