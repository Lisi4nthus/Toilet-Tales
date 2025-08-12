// src/components/Header.js
"use client";

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/auth");
  };
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고/사이트명 */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold hover:text-blue-200">
              Toilet Tales
            </Link>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-200 transition-colors"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/toilets"
                  className="hover:text-blue-200 transition-colors"
                >
                  화장실
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-200 transition-colors"
                >
                  대시보드
                </Link>
              </li>
              {!user && (
                <li>
                  <Link
                    href="/auth"
                    className="hover:text-blue-200 transition-colors"
                  >
                    로그인
                  </Link>
                </li>
              )}
              {user && (
                <>
                  <li className="hidden md:block text-sm text-blue-100">
                    {user.displayName || user.email}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-sm"
                    >
                      로그아웃
                    </button>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-sm"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? "라이트" : "다크"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

/*
설명:
- Link: Next.js의 특별한 링크 컴포넌트 (페이지 이동이 빠름)
- justify-between: 로고와 메뉴를 양쪽 끝으로 배치
- hover:: 마우스 올렸을 때의 스타일
- transition-colors: 색상 변화가 부드럽게 일어남
*/
