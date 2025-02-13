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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "กรุณากรอกอีเมล").email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    const { data, error } = await authClient.signIn.email(
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
      type ErrorTypes = Partial<
        Record<keyof typeof authClient.$ERROR_CODES, string>
      >;
      const errorCodes = {
        INVALID_EMAIL_OR_PASSWORD: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      } satisfies ErrorTypes;
      toast({
        title: "เกิดข้อผิดพลาด",
        description: errorCodes[error.code as keyof typeof errorCodes],
        variant: "destructive",
      });
      return;
    }

    const session = await authClient.getSession();
    router.push(
      session.data?.user.isOnBoarded ? "/admin/dashboard" : "/onboarding",
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
          <CardDescription>กรอกข้อมูลของคุณเพื่อเข้าสู่ระบบ</CardDescription>
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
                <Button type="submit" className="w-full">
                  เข้าสู่ระบบ
                </Button>
                <Button variant="outline" className="w-full">
                  เข้าสู่ระบบด้วย Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                ไม่มีบัญชี?{" "}
                <Link
                  href="/auth/register"
                  className="underline underline-offset-4"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
