"use server";

// import { cookies } from 'next/headers'

export async function login(
  prevState: { message: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  // TODO: Implement actual authentication logic here
  if (email === "user@example.com" && password === "password") {
    // cookies().set('session', 'dummy-session-token', { httpOnly: true })
    return { message: "Login successful" };
  }

  return { message: "Invalid email or password" };
}
