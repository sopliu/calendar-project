import SignUpForm from "./sign-up-form";
import { AuthProvider } from "@/components/contexts/auth-provider";

export default function SignUpPage() {
  return (
    <AuthProvider isPublic>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    </AuthProvider>
  );
}
