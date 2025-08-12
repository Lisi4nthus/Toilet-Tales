"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "toilet-tales-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // 초기 로드: 저장값 또는 시스템 선호도를 반영
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(THEME_STORAGE_KEY)
        : null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    // 시스템 선호도를 기본값으로
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // DOM에 data-theme 반영 및 저장
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null)
    throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
