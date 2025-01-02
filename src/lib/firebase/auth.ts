"use client";

import { useEffect, useState } from "react";
import {
  User,
  signOut as firebaseSignOut,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase/config";
import { FirebaseError } from "firebase/app";

export async function signIn(
  email: string,
  password: string,
  rememberMe: boolean = false
) {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence
  );
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  fullName: string,
  errorFn?: (msg: string) => void
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: fullName,
    });
  } catch (error: unknown) {
    if (errorFn && (error instanceof FirebaseError || error instanceof Error)) {
      errorFn(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
};

export function useAuth() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { auth, user };
}
