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
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { auth } from "@/lib/firebase/config";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMsg } from "@/utils/helpers";

export async function signIn(
  email: string,
  password: string,
  isPersistent: boolean = false,
  errorFn?: (msg: string) => void
) {
  try {
    setPersistence(
      auth,
      isPersistent ? browserLocalPersistence : browserSessionPersistence
    );

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (errorFn && (error instanceof FirebaseError || error instanceof Error)) {
      errorFn(getFirebaseErrorMsg(error.message));
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

export async function signOut() {
  await firebaseSignOut(auth);
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
      errorFn(getFirebaseErrorMsg(error.message));
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

// TODO: Update MongoDB user record with same email
export const signInWithGoogle = async (
  provider: GoogleAuthProvider,
  errorHandler?: (msg?: string) => void
) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) throw Error;

      signInWithCredential(auth, credential);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorHandler) errorHandler();
    });
};
