"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { type $ERROR_CODES, signIn, useSession } from "@/lib/auth-client";
import { type Login, LoginForm } from "@/modules/auth/components/login-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data } = useSession();

  // need to fix
  if (data) {
    router.push("/admin/dashboard");
  }

  const handleSubmit = async (values: Login) => {
    setIsSubmitting(true);

    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });

    if (error?.code) {
      type ErrorTypes = Partial<Record<keyof typeof $ERROR_CODES, string>>;
      const errorCodes = {
        INVALID_EMAIL_OR_PASSWORD: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      } satisfies ErrorTypes;
      toast({
        title: "เกิดข้อผิดพลาด",
        description: errorCodes[error.code as keyof typeof errorCodes],
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/dashboard");
    toast({
      title: "เข้าสู่ระบบสำเร็จ",
      description: "ยินดีต้อนรับกลับมา",
    });
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
        <Link href="/auth/sign-up" className="underline underline-offset-4">
          สมัครสมาชิก
        </Link>
      </div>
    </>
  );
}
