"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { type Login, LoginForm } from "@/modules/auth/components/login-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: Login) => {
    setIsSubmitting(true);

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });

    if (error?.code) {
      type ErrorTypes = Partial<
        Record<keyof typeof authClient.$ERROR_CODES, string>
      >;
      const errorCodes = {
        INVALID_EMAIL_OR_PASSWORD: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      } satisfies ErrorTypes;
      toast(errorCodes[error.code as keyof typeof errorCodes]);
      setIsSubmitting(false);
      return;
    }

    router.push("/app/dashboard");
    toast("เข้าสู่ระบบสำเร็จ");
    setIsSubmitting(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">เข้าสู่ระบบ</h1>
      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <Button disabled variant="outline" size="lg" className="w-full">
        เข้าสู่ระบบด้วย Google
      </Button>
      <div className="text-center text-sm">
        ไม่มีบัญชี?{" "}
        <Link href="/auth/register" className="underline underline-offset-4">
          สมัครสมาชิก
        </Link>
      </div>
    </>
  );
}
