// src/app/layout.js
import Layout from "../components/Layout";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Toilet Tales",
  description: "깨끗하고 청결한 화장실 이야기",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

/*
설명:
- 이 파일은 모든 페이지에 공통으로 적용되는 레이아웃입니다
- metadata: 웹사이트의 제목과 설명 (SEO(Search Engine Optimization)에 중요)
- children: 각 페이지의 내용이 여기에 들어갑니다
*/
