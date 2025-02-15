import { Button } from "@/components/ui/button";
import { LoginForm } from "@/modules/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">เข้าสู่ระบบ</h1>
      <LoginForm />
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
