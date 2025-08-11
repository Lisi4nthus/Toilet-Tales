// src/components/Button.js
"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
}) {
  // 버튼 스타일을 variant에 따라 결정
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "secondary":
        return "bg-gray-600 hover:bg-gray-700 text-white";
      case "outline":
        return "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white";
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  // 버튼 크기를 size에 따라 결정
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "px-3 py-1.5 text-sm";
      case "medium":
        return "px-4 py-2 text-base";
      case "large":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        rounded-md
        font-medium
        transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-blue-500
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

/*
사용 예시:
<Button variant="primary" size="large" onClick={handleClick}>
  클릭하세요
</Button>

<Button variant="outline" size="small">
  취소
</Button>

설명:
- children: 버튼 안에 들어갈 텍스트나 아이콘
- variant: 버튼 스타일 종류 (primary, secondary, outline, danger)
- size: 버튼 크기 (small, medium, large)
- disabled: 버튼 비활성화 여부
- className: 추가로 적용할 CSS 클래스
*/
