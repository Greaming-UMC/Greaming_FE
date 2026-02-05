import type { HTMLAttributes, InputHTMLAttributes } from 'react';
import Icon from '../common/Icon'; 
import { Avatar, Divider } from '../common/display';


/* -------------------------------------------------------------------------- */
/* 1. Root & List (레이아웃)                                                 */
/* -------------------------------------------------------------------------- */

// 전체를 감싸는 컨테이너
export const ChattingRoot = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <section className={`flex flex-col w-full h-full bg-[#F7F7F7] ${className}`} {...props}>
    {children}
  </section>
);

// 상단 헤더 (아이콘 + 댓글 수)
export const ChattingHeader = ({ className = '' }: { className?: string }) => (
  <div className={`p-4 pb-2 flex flex-col gap-2 ${className}`}>
    <div className="flex items-center gap-2 text-on-surface">
      <Icon name="chat" size={20} />
      <h3 className="font-bold text-lg">댓글 </h3>
    </div>
    <Divider className="mt-2" />
  </div>
);

// 댓글 리스트 영역 (스크롤)
export const ChattingList = ({ children, className = '' }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex-1 overflow-y-auto px-4 pb-4 space-y-4 [&::-webkit-scrollbar]:hidden 
      [-ms-overflow-style:none] 
      [scrollbar-width:none] ${className}`}>
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/* 2. Item (개별 댓글)                                                       */
/* -------------------------------------------------------------------------- */

interface ChattingItemProps extends HTMLAttributes<HTMLDivElement> {
  avatarSrc?: string;
  nickname: string;
  content: string;
  date?: string; 
  isLiked?: boolean;
  likeCount?: number;
  /** 대댓글 여부 (true면 왼쪽 들여쓰기 적용) */
  isReply?: boolean; 
  onReply?: () => void;
  onLike?: () => void;
}

export const ChattingItem = ({
  avatarSrc,
  nickname,
  content,
  date,
  isLiked = false,
  likeCount,
  isReply = false,
  onReply,
  onLike,
  className = '',
  ...props
}: ChattingItemProps) => {
  return (

    <div 
      className={`flex gap-3 w-full ${isReply ? 'pl-10' : ''} ${className}`} 
      {...props}
    >
      {/* 아바타 */}
      <div className="shrink-0 flex-none">
       <Avatar src={avatarSrc} size="sm" alt={nickname} />
      </div>
      

      {/* 컨텐츠 */}
      <div className="flex-1 flex justify-between  min-w-0">
        <div className="flex flex-col gap-1 min-w-0 items-start">
          {/* 닉네임 & 날짜 */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-primary">{nickname}</span>
            {date && <span className="text-xs text-gray-400">{date}</span>}
          </div>

          {/* 본문 */}
          <p className="text-sm text-primary leading-relaxed whitespace-normal break-words pl-0 ml-0 text-left">
            {String(content).trim()}
          </p>

          {/* 답글 달기 버튼 */}
          <button 
            onClick={onReply}
            className="text-xs text-gray-500 font-medium mt-1 text-left hover:underline w-fit"
          >
            답글 달기
          </button>
        </div>

        {/* 좋아요 버튼 */}
        <button 
          onClick={onLike}
          className="p-1 transition-colors"
        >
          <Icon name={isLiked ? 'like_solid' : 'like'} size={20} />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Reply Separator (답글 숨기기/보기 구분선)                               */
/* -------------------------------------------------------------------------- */

interface ReplySeparatorProps extends HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean; // true: 펼쳐짐(숨기기 버튼 보임), false: 닫힘(보기 버튼 보임)
  replyCount?: number;
}

export const ChattingReplySeparator = ({ 
  isOpen, 
  replyCount, 
  onClick, 
  className = '' 
}: ReplySeparatorProps) => (
  // 대댓글 라인에 맞춰 들여쓰기(pl-12) 적용
  <div className={`flex items-center gap-3 pl-12 py-1 ${className}`}>
    <div className="h-[1px] w-6 bg-gray-300"></div>
    <button 
      onClick={onClick}
      className="text-xs text-gray-500 shrink-0 hover:text-gray-700 font-medium"
    >
      {isOpen ? '답글 숨기기' : `답글 ${replyCount ?? ''}개 보기`}
    </button>
    <div className="h-[1px] w-6 bg-gray-300"></div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 4. Input (입력창)                                                         */
/* -------------------------------------------------------------------------- */

interface ChattingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  userAvatarSrc?: string;
  onSubmit?: () => void;
  disabled?: boolean;
}

export const ChattingInput = ({ 
  userAvatarSrc, 
  value, 
  onChange, 
  onSubmit, 
  disabled = false,
  className = '', 
  ...props 
}: ChattingInputProps) => {
  return (
    <div className={`p-4 bg-white border-t border-gray-100 flex items-center gap-3 ${className}`}>
      {/* 내 아바타 */}
      <div className="shrink-0">
       <Avatar src={userAvatarSrc} size="sm" alt="me" />
      </div>

      {/* 입력 필드 (둥근 회색 배경) */}
      <div className="flex-1 flex items-center bg-[#F7F7F7] rounded-full px-4 py-2.5">
        <input
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
          placeholder={disabled ? "댓글을 달 수 없습니다." : "댓글 달기..."}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        
        {/* 전송 버튼 */}
        <button 
          onClick={onSubmit} 
          disabled={!value || disabled}
          className={`ml-2 transition-colors ${value ? 'text-primary' : 'text-gray-300'}`}
        >
          <Icon name="arrow-up-circle" size={35} className="fill-current" />
        </button>
      </div>
    </div>
  );
};


//  빈 상태 또는 막힌 상태를 보여주는 컴포넌트
interface ChattingEmptyProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
}



/* -------------------------------------------------------------------------- */
/* 5. ChattingEmpty (가운데 정렬된 안내문구)                                 */
/* -------------------------------------------------------------------------- */


export const ChattingEmpty = ({ 
  message = '댓글이 없습니다.', 
  className = '', 
  ...props 
}: ChattingEmptyProps) => (
  <div 
    className={`flex-1 flex flex-col items-center justify-center text-on-surface-variant-low text-sm ${className}`} 
    {...props}
  >
    <span>{message}</span>
  </div>
);



/* -------------------------------------------------------------------------- */
/* 6. Export (Compound Object)                                               */
/* -------------------------------------------------------------------------- */

export const Chatting = {
  Root: ChattingRoot,
  Header: ChattingHeader,
  List: ChattingList,
  Item: ChattingItem,
  ReplySeparator: ChattingReplySeparator,
  Input: ChattingInput,
  Empty: ChattingEmpty,
};