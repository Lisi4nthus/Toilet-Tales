// src/components/Card.js
export default function Card({
  children,
  title,
  subtitle,
  className = "",
  hover = true,
}) {
  return (
    <div
      className={`
        bg-white 
        rounded-lg 
        shadow-md 
        border 
        border-gray-200 
        overflow-hidden
        ${hover ? "hover:shadow-lg transition-shadow" : ""}
        ${className}
      `}
    >
      {/* 카드 헤더 (title이나 subtitle이 있을 때만 표시) */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* 카드 본문 */}
      <div className="p-6">{children}</div>
    </div>
  );
}

/*
  사용 예시:
  <Card title="제목" subtitle="부제목">
    <p>카드 내용이 여기에 들어갑니다.</p>
    <Button variant="primary">버튼</Button>
  </Card>
  
  <Card hover={false} className="bg-blue-50">
    <p>hover 효과가 없는 카드입니다.</p>
  </Card>
  
  설명:
  - title, subtitle: 카드 상단에 표시될 제목과 부제목
  - hover: 마우스 올렸을 때 그림자 효과 여부
  - className: 추가 스타일링을 위한 클래스
  - children: 카드 안에 들어갈 내용
  */
