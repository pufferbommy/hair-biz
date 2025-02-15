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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPassword = z.object({
  email: z.string().min(1, "กรุณากรอกอีเมล").email("กรุณากรอกอีเมลที่ถูกต้อง"),
});

export type ForgotPassword = z.infer<typeof ForgotPassword>;

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPassword) => void;
  isSubmitting: boolean;
}

export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { onSubmit, isSubmitting } = props;

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button
          loading={isSubmitting}
          type="submit"
          size="lg"
          className="w-full"
        >
          ส่งลิงก์รีเซ็ตรหัสผ่าน
        </Button>
      </form>
    </Form>
  );
}
