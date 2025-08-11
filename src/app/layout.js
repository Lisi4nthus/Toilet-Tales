// src/app/layout.js
import Layout from "../components/Layout";
import "./globals.css";

export const metadata = {
  title: "내 웹사이트",
  description: "Next.js로 만든 멋진 웹사이트입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

/*
설명:
- 이 파일은 모든 페이지에 공통으로 적용되는 레이아웃입니다
- metadata: 웹사이트의 제목과 설명 (SEO에 중요)
- children: 각 페이지의 내용이 여기에 들어갑니다
*/
