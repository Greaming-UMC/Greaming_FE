import { useEffect, useState } from "react";
import clsx from "clsx";
import arrowUpCircle from "../../assets/icon/arrow_up_circle.svg";

export interface CommentInputRowProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;

  /**  프로필 이미지: URL 또는 File 중 하나만 써도 됨 */
  profileImageUrl?: string | null;
  profileImageFile?: File | null;

  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const CommentInputRow = ({
  value,
  onChange,
  onSubmit,
  profileImageUrl = null,
  profileImageFile = null,
  placeholder = "댓글 달기...",
  disabled = false,
  className,
}: CommentInputRowProps) => {
  const canSubmit = value.trim().length > 0 && !disabled;

  // File이 들어오면 로컬 미리보기 URL 생성
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!profileImageFile) {
      setFilePreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(profileImageFile);
    setFilePreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [profileImageFile]);

  // File이 우선, 없으면 URL 사용
  const resolvedProfileSrc = filePreviewUrl ?? profileImageUrl ?? null;

  return (
    <>
      {/* 스크롤 스타일을 이 컴포넌트에만 주입 */}
      <style>
        {`
          .comment-scroll::-webkit-scrollbar { width: 4px; }
          .comment-scroll::-webkit-scrollbar-track { background: transparent; }
          .comment-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.25);
            border-radius: 999px;
          }
          .comment-scroll::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0,0,0,0.4);
          }
          .comment-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(0,0,0,0.25) transparent;
          }
        `}
      </style>

      <div
        className={clsx("flex items-center", className)}
        style={{
          width: 344,
          height: 78,
          background: "var(--color-surface-variant-high)",
          border: "1px solid",
          borderColor: "var(--color-surface-variant-low)",
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          paddingTop: 16,
          paddingRight: 12,
          paddingBottom: 8,
          paddingLeft: 12,
          boxSizing: "border-box",
          gap: 10,
        }}
      >
        {/* 프로필 영역 (기본 원 + 이미지 있으면 덮어쓰기) */}
        <div
          aria-label="프로필"
          style={{
            width: 29,
            height: 29,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            background: "#BDBDBD", // 색상 임의 지정 
            transform: "translateY(-10px)", 
          }}
        >
          {resolvedProfileSrc ? (
            <img
              src={resolvedProfileSrc}
              alt="프로필 이미지"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : null}
        </div>

        {/* 입력 영역 */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="comment-scroll resize-none bg-transparent outline-none body-medium placeholder:text-on-surface-variant-lowest"
          style={{
            flex: 1,
            height: 54,
            overflowY: "auto",
            padding: 0,
            margin: 0,
            border: 0,
            background: "transparent",
          }}
          onKeyDown={(e) => {
            // Enter 전송(Shift+Enter 줄바꿈)
            if (e.key === "Enter" && !e.shiftKey && canSubmit) {
              e.preventDefault();
              onSubmit();
            }
          }}
        />

        {/* 전송 버튼 */}
        <button
          type="button"
          aria-label="댓글 전송"
          disabled={!canSubmit}
          onClick={onSubmit}
          style={{
            width: 32,
            height: 32,
            flexShrink: 0,
            padding: 0,
            border: 0,
            background: "transparent",
            cursor: canSubmit ? "pointer" : "default",
          }}
        >
          <img
            src={arrowUpCircle}
            alt=""
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
              display: "block",
              transform: "translateY(-2px) scale(1.15)", // 크기 좀 키움 
              transformOrigin: "center",
              filter: canSubmit ? "none" : "grayscale(1) opacity(0.65)",
            }}
          />
        </button>
      </div>
    </>
  );
};
