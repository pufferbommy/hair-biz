type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-8">{props.children}</div>
    </div>
  );
}
