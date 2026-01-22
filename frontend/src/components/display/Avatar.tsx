import { useState, useEffect, type HTMLAttributes } from "react";
import Icon from "../common/Icon";

//사용 예시 <Avatar src="https://example.com/avatar.jpg" alt="User Avatar" size="md" />
/* -------------------------------------------------------------------------- */
/* 1. Size Presets                                                           */
/* -------------------------------------------------------------------------- */

const sizePresets = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 112,
  xl: 128,
};

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 사용자 프로필 이미지 URL */
  src?: string | null;
  /** 이미지 없을 때 보여줄 아이콘 이름 (기본값: 'person_filled') */
  icon?: string;
  /** 접근성 텍스트 */
  alt?: string;
  /** 크기 */
  size?: keyof typeof sizePresets | number;
}

/* -------------------------------------------------------------------------- */
/* 2. Main Component                                                         */
/* -------------------------------------------------------------------------- */

export const Avatar = ({
  src,
  icon = "profile_Icon",
  alt = "avatar",
  size = "md",
  className = "",
  ...props
}: AvatarProps) => {
  // 이미지 에러 상태
  const [hasError, setHasError] = useState(false);

  // src가 바뀌면 에러 상태 초기화 (새로운 시도)
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // 실제 픽셀 크기
  const pixelSize = typeof size === "number" ? size : sizePresets[size];

  return (
    <div
      className={`
        relative inline-flex shrink-0 items-center justify-center
        rounded-full overflow-hidden
        bg-surface-variant-lowest
        ${className}
      `}
      style={{ width: pixelSize, height: pixelSize }}
      {...props}
    >
      {/* 1. 실제 사진이 있고 + 에러가 안 났을 때 */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        /* 2. 사진이 없거나 깨졌을 때 -> Icon으로 대체 */
        /* 아이콘을 꽉 차게 하거나 적절한 크기로 중앙 배치 */
        <div className="flex h-full w-full items-center justify-center">
          <Icon name={icon} size={pixelSize} className="fill-current" />
        </div>
      )}
    </div>
  );
};
