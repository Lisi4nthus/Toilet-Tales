"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      loading,
      signInWithGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
      },
      signInWithEmail: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      signUpWithEmail: async (email, password, displayName) => {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (displayName) {
          await updateProfile(cred.user, { displayName });
        }
      },
      signOut: async () => {
        await signOut(auth);
      },
    };
  }, [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
