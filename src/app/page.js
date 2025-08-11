// src/app/page.js
"use client";

import Card from "../components/Card";
import Button from "../components/Button";

export default function HomePage() {
  const handleClick = () => {
    alert("버튼이 클릭되었습니다!");
  };

  return (
    <div>
      {/* 메인 섹션 */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">환영합니다!</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Next.js와 React로 만든 멋진 웹사이트입니다. 공통 컴포넌트들을 활용해서
          일관된 디자인을 유지할 수 있어요.
        </p>
        <Button variant="success" size="large" onClick={handleClick}>
          시작하기
        </Button>
      </section>

      {/* 카드 섹션 */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">주요 특징</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="빠른 개발" subtitle="재사용 가능한 컴포넌트">
            <p className="text-gray-600 mb-4">
              한 번 만든 컴포넌트를 여러 곳에서 재사용할 수 있어서 개발 속도가
              빨라집니다.
            </p>
            <Button variant="primary" size="small">
              자세히 보기
            </Button>
          </Card>

          <Card title="일관된 디자인" subtitle="통일된 UI/UX">
            <p className="text-gray-600 mb-4">
              공통 컴포넌트를 사용하면 전체 사이트의 디자인이 일관되게
              유지됩니다.
            </p>
            <Button variant="secondary" size="small">
              더 알아보기
            </Button>
          </Card>

          <Card title="쉬운 유지보수" subtitle="효율적인 관리">
            <p className="text-gray-600 mb-4">
              컴포넌트를 수정하면 해당 컴포넌트를 사용하는 모든 곳에 자동으로
              적용됩니다.
            </p>
            <Button variant="warning" size="small" disabled>
              시작하기
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}

/*
설명:
- grid: CSS Grid를 사용해서 카드들을 정렬
- md:grid-cols-3: 모바일에서는 1열, 태블릿 이상에서는 3열
- gap-6: 카드들 사이의 간격
- max-w-2xl mx-auto: 텍스트 너비를 제한하고 중앙 정렬
*/
