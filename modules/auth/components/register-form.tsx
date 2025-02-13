"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().min(1, "กรุณากรอกอีเมล").email("กรุณากรอกอีเมลที่ถูกต้อง"),
    password: z.string().min(8, "กรุณากรอกรหัสผ่านที่มีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z.string().min(1, "กรุณายืนยันรหัสผ่าน"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: "",
      image: undefined,
      isOnBoarded: false,
    });
    if (error?.code) {
      type ErrorTypes = Partial<
        Record<keyof typeof authClient.$ERROR_CODES, string>
      >;
      const errorCodes = {
        USER_ALREADY_EXISTS: "อีเมลนี้มีผู้ใช้งานแล้ว",
      } satisfies ErrorTypes;
      toast({
        title: "เกิดข้อผิดพลาด",
        description: errorCodes[error.code as keyof typeof errorCodes],
        variant: "destructive",
      });
      return;
    }
    router.push("/onboarding");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">สมัครสมาชิก</CardTitle>
          <CardDescription>กรอกข้อมูลของคุณเพื่อสมัครสมาชิก</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อีเมล</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="m@example.com" />
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
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">สมัครสมาชิก</Button>
              </div>
              <div className="mt-4 text-center text-sm">
                มีบัญชีอยู่แล้ว?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  เข้าสู่ระบบ
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
