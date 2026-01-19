import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonSize = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  icon?: ReactNode;
  bgColor?: string;       
  textColor?: string;     
  borderColor?: string;   
}

const Round_Button = ({
  children,
  size='md',
  icon,
  className = '',
  disabled,
  bgColor = 'bg-primary',     
  textColor = 'text-on-primary',
  borderColor = 'border-transparent',
  ...props
}: ButtonProps) => {
  
  const baseStyle = 
    "inline-flex items-center justify-center rounded-full font-medium border box-border";

  // 사이즈별 스타일
  const sizeStyles = {
    xxxs: "h-5 px-3 text-[10px] gap-1",
    xxs:  "h-7 px-2.5 text-xs gap-1.5",
    xs:   "h-[30px] px-3 text-xs gap-2.5",
    sm:   "h-[33px] px-4 text-sm gap-2.5 rounded-[16px]",
    md:   "h-[35px] px-5 text-sm gap-2.5",
    lg:   "h-[38px] px-6 text-base gap-2.5",
    xl:   "h-[44px] px-8 text-lg gap-2.5",
  };

  return (
    <button
      className={`
        ${baseStyle} 
        ${sizeStyles[size]} 
        ${bgColor} 
        ${textColor} 
        ${borderColor} 
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex items-center shrink-0">{icon}</span>}
      <span className="leading-none pb-[1px]">{children}</span>
    </button>
  );
};

export default Round_Button;


/* 사용 예시
    <Round_Button size="lg" icon={<아이콘 임포트 하시면 됩니다/>} bgColor="bg-secondary" textColor="text-on-secondary" borderColor="border-outline">
        버튼 텍스트 자리
    </Round_Button> 
*/