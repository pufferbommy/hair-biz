import { SignUpForm } from "@/modules/auth/components/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center">สมัครสมาชิก</h1>
      <SignUpForm />
      <div className="text-center text-sm">
        มีบัญชีอยู่แล้ว?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          เข้าสู่ระบบ
        </Link>
      </div>
    </>
  );
}
