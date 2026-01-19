import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSize = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

const RoundButton = ({
  children,
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  bgColor = 'bg-primary',
  textColor = 'text-on-primary',
  borderColor = 'border-transparent',
  ...props
}: ButtonProps) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-full font-medium';

  // 사이즈별 스타일
  const sizeStyles: Record<ButtonSize, string> = {
    xxxs: 'h-5 px-3 text-[10px] gap-1',
    xxs: 'h-7 px-2.5 text-xs gap-1.5',
    xs: 'h-[30px] px-3 text-xs gap-2.5',
    sm: 'h-[33px] px-4 text-sm gap-2.5 rounded-[16px]',
    md: 'h-[35px] px-5 text-sm gap-2.5',
    lg: 'h-[38px] px-6 text-base gap-2.5',
    xl: 'h-[44px] px-8 text-lg gap-2.5',
  };

  return (
    <button
      className={`
        ${baseStyle} 
        ${sizeStyles[size]} 
        ${bgColor} 
        ${textColor} 
        ${borderColor}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center shrink-0">{leftIcon}</span>}
      <span className="leading-none pb-[1px]">{children}</span>
      {rightIcon && <span className="flex items-center shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default RoundButton;

/* 사용 예시
    <RoundButton 
        size="lg" 
        leftIcon={<아이콘 삽입 />} 
        rightIcon={<아이콘 삽입 />} 
        bgColor="bg-secondary" 
        textColor="text-on-secondary" 
        borderColor="border-outline"
    >
        버튼 텍스트 자리
    </RoundButton> 
*/