import { AuthProvider } from "@/components/contexts/auth-provider";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <NavBar /> */}
      <AuthProvider>
        <div className="mt-20">{children}</div>
      </AuthProvider>
    </div>
  );
}
