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
import { signUp, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Register = z.object({
  email: z.string().min(1, "กรุณากรอกอีเมล").email("กรุณากรอกอีเมลที่ถูกต้อง"),
  password: z
    .string()
    .min(8, "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร")
    .regex(/[A-Z]/, "รหัสผ่านต้องมีอักษรใหญ่ (A-Z) อย่างน้อย 1 ตัว")
    .regex(/\d/, "รหัสผ่านต้องมีตัวเลข (0-9) อย่างน้อย 1 ตัว"),
});

export type Register = z.infer<typeof Register>;

interface SignUpFormProps {
  onSubmit: (values: Register) => void;
  isSubmitting: boolean;
}

export function SignUpForm(props: SignUpFormProps) {
  const form = useForm<Register>({
    resolver: zodResolver(Register),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(props.onSubmit)}>
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
              <FormLabel>รหัสผ่าน</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="********" />
              </FormControl>
              <ul className="text-sm space-y-1">
                {[
                  {
                    test: field.value.length >= 8,
                    text: "อย่างน้อย 8 ตัวอักษร",
                  },
                  {
                    test: /[A-Z]/.test(field.value),
                    text: "อักษรตัวใหญ่ (A-Z) อย่างน้อย 1 ตัว",
                  },
                  {
                    test: /\d/.test(field.value),
                    text: "ตัวเลข (0-9) อย่างน้อย 1 ตัว",
                  },
                ].map(({ test, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "size-[calc(14px*0.75)] shrink-0 border rounded-full transition-colors",
                        test
                          ? "bg-green-200 border-green-300"
                          : "bg-red-200 border-red-300",
                      )}
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={props.isSubmitting}
        >
          สมัครสมาชิก
        </Button>
      </form>
    </Form>
  );
}
