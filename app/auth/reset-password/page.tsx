"use client";

import { authClient } from "@/lib/auth-client";
import {
  type ResetPassword,
  ResetPasswordForm,
} from "@/modules/auth/components/reset-password-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const token = new URLSearchParams(window.location.search).get("token");
  if (!token) {
    return router.push("/auth/login");
  }

  const handleSubmit = async (values: ResetPassword) => {
    setIsSubmitting(true);

    const { data, error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">รีเซ็ตรหัสผ่าน</h1>
      <ResetPasswordForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  );
}
