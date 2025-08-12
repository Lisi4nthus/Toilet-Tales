"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function AuthPage() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } =
    useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [mode, setMode] = useState("login");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    router.replace("/toilets");
    return null;
  }

  const handleEmailAuth = async () => {
    setSubmitting(true);
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, displayName);
      }
      router.replace("/toilets");
    } catch (e) {
      setError(e?.message ?? "인증에 실패했습니다");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    setError("");
    try {
      await signInWithGoogle();
      router.replace("/toilets");
    } catch (e) {
      setError(e?.message ?? "Google 로그인 실패");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card
        title="로그인 / 회원가입"
        subtitle="리뷰 작성을 위해 먼저 로그인하세요"
      >
        <div className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="닉네임"
              className="w-full border rounded px-3 py-2"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="이메일"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-2">
            <Button
              onClick={handleEmailAuth}
              disabled={submitting}
              variant="primary"
              className="w-full"
            >
              {mode === "login" ? "이메일로 로그인" : "이메일로 가입"}
            </Button>
            <Button
              onClick={handleGoogle}
              disabled={submitting}
              variant="secondary"
              className="w-full"
            >
              Google
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            {mode === "login" ? (
              <button className="underline" onClick={() => setMode("signup")}>
                아직 계정이 없나요? 회원가입
              </button>
            ) : (
              <button className="underline" onClick={() => setMode("login")}>
                이미 계정이 있나요? 로그인
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
