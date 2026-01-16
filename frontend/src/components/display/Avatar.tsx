import { useState, useEffect, type HTMLAttributes } from 'react';
import Icon from '../common/Icon'; 

// 피그마 사이즈 프리셋 
// 27px, 29px 같은 특이한 사이즈는 숫자로 직접 넣을 수 있게 처리함
const sizePresets = {
  xs: 25,   // 피드, 댓글 등
  sm: 32,   // 상단바, 리스트
  md: 54,   // 중간 크기
  lg: 112,  // 프로필 설정 모달 등
  xl: 138,  // 마이페이지 메인
};

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** 이미지 URL (없으면 기본 아이콘 노출) */
  src?: string | null;
  /** 접근성 텍스트 */
  alt?: string;
  /** * 크기 설정 
   * - 프리셋: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
   * - 커스텀: 숫자 (예: 29) 
   */
  size?: keyof typeof sizePresets | number;
  /** 기본 아이콘 이름 (기본값: 'person') */
  fallbackIcon?: string;
}

export const Avatar = ({
  src,
  alt = 'user avatar',
  size = 'md',
  fallbackIcon = 'person', // 가지고 있는 아이콘 이름으로 변경 (예: 'user', 'default-profile')
  className = '',
  ...props
}: AvatarProps) => {
  // 2. 이미지 에러 상태 관리 (핵심 로직)
  const [hasError, setHasError] = useState(false);

  // src가 바뀌면 에러 상태 초기화 (새로운 이미지는 다시 시도해야 하니까)
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // 3. 실제 픽셀 크기 계산
  const pixelSize = typeof size === 'number' ? size : sizePresets[size];
  
  // 아이콘 크기는 아바타 크기의 60% 정도로 설정 (비율 유지)
  const iconSize = Math.round(pixelSize * 0.6);

  return (
    <div
      className={`
        relative inline-flex items-center justify-center overflow-hidden shrink-0
        rounded-full 
        bg-on-surface-variant-lowest /* 배경색 */
        text-on-surface-variant /* 아이콘 색상 */
        ring-1 ring-white/10 /* 선택사항: 미세한 테두리로 구분감 */
        ${className}
      `}
      style={{ width: pixelSize, height: pixelSize }} // 크기는 style로 직접 제어
      {...props}
    >
      {/* 4. 이미지가 존재하고 + 에러가 안 났을 때만 img 태그 렌더링 */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)} //로드 실패 시 
          className="h-full w-full object-cover"
        />
      ) : (
        /* 5. 실패하거나 src가 없으면 아이콘 렌더링 */
        <Icon 
          name={fallbackIcon} 
          size={iconSize} 
        />
      )}
    </div>
  );
};