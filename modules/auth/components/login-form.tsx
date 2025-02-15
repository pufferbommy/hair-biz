"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "@/hooks/use-toast";
import { type $ERROR_CODES, signIn, useSession } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "กรุณากรอกอีเมล").email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

export function LoginForm() {
  const router = useRouter();

  const { data } = useSession();

  if (data) {
    router.push("/admin/dashboard");
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    const { error } = await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          console.log("onSuccess", data);
        },
      },
    );

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
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>อีเมล</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="johndoe@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <a
                    href="forgot-password"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>
                <FormControl>
                  <PasswordInput {...field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            loading={isSubmitting}
            type="submit"
            size="lg"
            className="w-full"
          >
            เข้าสู่ระบบ
          </Button>
        </form>
      </Form>
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
