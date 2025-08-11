// src/components/Layout.js
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 영역 */}
      <Header />

      {/* 메인 콘텐츠 영역 - children은 각 페이지의 내용이 들어옴 */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* 푸터 영역 */}
      <Footer />
    </div>
  );
}

/*
설명:
- children: 이 레이아웃 안에 들어갈 페이지 내용
- flex-1: 메인 영역이 남은 공간을 모두 차지하게 함
- container mx-auto: 콘텐츠를 중앙에 배치하고 적당한 너비로 제한
*/
