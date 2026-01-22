import type{ ReactNode } from 'react';
import Icon from '../common/Icon'; 
/**
 * EmptyState 컴포넌트
 * 
 * 사용 예시:
 * <EmptyState 
 *   icon="search" 
 *   title="검색 결과가 없어요" 
 *   description="다른 검색어로 시도해 보거나 필터를 변경해 보세요."
 *   action={<button>다시 시도</button>}
 * />
 */

interface EmptyStateProps {
  /** * 보여줄 아이콘 이름 
   * - 값을 넣으면 아이콘 렌더링
   * - 값을 안 넣으면(undefined) 아이콘 없이 텍스트만 나옴 
   */
  icon?: string;
  
  /** 굵은 제목 (Required) */
  title: string;
  
  /** 부가 설명 (Optional) */
  description?: string;
  
  /** 하단 액션 버튼 (Optional) */
  action?: ReactNode;
  
  /** 스타일 오버라이딩 */
  className?: string;
}

export const EmptyState = ({
  icon, 
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) => {
  return (
    <div 
      className={`
        flex flex-col items-center justify-center text-center p-6
        min-h-[180px] /* 아이콘 없을 때를 대비해 최소 높이를 살짝 줄임 (240 -> 180) */
        rounded-xl
        ${className}
      `}
    >
      {icon && (
        <div className="mb-4">
          <Icon name={icon} size={48} className="fill-current opacity-40" />
        </div>
      )}

      {/* 제목 */}
      <h3 className="text-lg font-bold text-on-surface mb-2">
        {title}
      </h3>

      {/* 설명 */}
      {description && (
        <p className="text-sm text-on-surface-variant mb-6 max-w-xs break-keep">
          {description}
        </p>
      )}

      {/* 액션 */}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};