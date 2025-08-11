// src/components/Footer.js
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 저작권 정보 */}
          <div className="text-sm text-gray-300">
            © {currentYear} 내 웹사이트. All rights reserved.
          </div>

          {/* 소셜 미디어 링크 (예시) */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/*
  설명:
  - new Date().getFullYear(): 현재 연도를 자동으로 가져옴
  - md:flex-row: 모바일에서는 세로, 태블릿 이상에서는 가로 배치
  - aria-label: 접근성을 위한 레이블
  */
