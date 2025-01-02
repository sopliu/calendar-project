import { AuthProvider } from "@/components/contexts/auth-provider";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <AuthProvider isPublic>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </AuthProvider>
  );
}
