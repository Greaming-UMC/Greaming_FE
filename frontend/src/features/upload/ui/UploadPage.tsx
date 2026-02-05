// Greaming_FE\frontend\src\features\upload\ui\UploadPage.tsx

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import { UploadBox } from "../../../components/common/post/UploadBox";
import { WriteBodyField } from "../../../components/common/post/WriteBodyField";
import { Checkbox } from "../../../components/common/input/Checkbox/Checkbox";
import { HashtagField } from "./components/HashtagField";

// 업로드 로딩: 온보딩 로고 드로잉 사용
import { AnimatedLogoDraw } from "../../onboarding/ui/AnimatedLogoDraw";

// Upload 요청 타입(참고용)
import type { UploadSubmissionRequest } from "../../../apis/types/upload/uploadSubmission";

/** header를 함수로도 받을 수 있게 */
export type UploadPageHeaderRender = (ctx: {
  uploadButtonNode: React.ReactNode;
}) => React.ReactNode;

export type UploadPageProps = {
  header?: React.ReactNode | UploadPageHeaderRender;
};

export default function UploadPage({ header }: UploadPageProps) {
  const PAGE_WIDTH = 1372;

  // 이미지들: 새로 추가되는 건 "뒤(오른쪽)"으로 변경했습니다. 
  const [images, setImages] = useState<File[]>([]);

  const [isPrivate, setIsPrivate] = useState(false);
  const [allowComment, setAllowComment] = useState(false);

  const [body, setBody] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  //  업로드 버튼 활성 조건: 이미지 + 설명 + 태그
  const canUpload = useMemo(() => {
    const hasBody = body.trim().length > 0;
    const hasTags = tags.length > 0;
    const hasImage = images.length > 0;
    return hasBody && hasTags && hasImage;
  }, [body, tags.length, images.length]);

  // 로딩 UI
  const [isUploading, setIsUploading] = useState(false);

  const onClickUpload = async () => {
    if (!canUpload || isUploading) return;

    const payload: UploadSubmissionRequest = {
      title: "", // 아직 UI에 제목 없으면 빈 값
      caption: body,
      visibility: isPrivate ? "PRIVATE" : "PUBLIC",
      commentEnabled: allowComment,
      challengeId: 0, // daily/weekly면 실제 id 넣기
      circleId: null, // circle이면 넣기
      hashtags: tags,
      imageUrls: [], // 지금은 File이라서 추후 업로드 후 URL로 채우기
    };

    setIsUploading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      console.log("UPLOAD payload", payload);
    } finally {
      setIsUploading(false);
    }
  };

  // 새로 추가되는 이미지를 "뒤(오른쪽)"으로 붙임
  const onAddImage = (file: File | null) => {
    if (!file) return;
    setImages((prev) => [...prev, file]);
  };

  /* -------------------------------------------------------------------------- */
  /* 가로 스크롤 + 마우스 드래그 (기존 커서 그대로)                               */
  /* -------------------------------------------------------------------------- */
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const updateScrollRatio = () => {
    // ScrollIndicator가 scrollerRef를 직접 보니까 여기서는 ratio state 필요 없음
  };

  useEffect(() => {
    updateScrollRatio();
  }, [images.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateScrollRatio();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const el = scrollerRef.current;
      if (!el) return;

      const dx = e.clientX - dragRef.current.startX;
      el.scrollLeft = dragRef.current.startScrollLeft - dx;
    };

    const onUp = () => {
      dragRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onMouseDownScroller = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;

    dragRef.current.active = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startScrollLeft = el.scrollLeft;

    e.preventDefault();
  };

  /* -------------------------------------------------------------------------- */
  /* 업로드 버튼 스타일 (활성: 검정 / 비활성: 회색)                               */
  /* -------------------------------------------------------------------------- */
  const uploadBtnBase =
    "w-[142px] h-[44px] rounded-[28px] flex items-center justify-center";
  const uploadBtnEnabled =
    "bg-[var(--color-primary)] text-[var(--color-on-primary)]";
  const uploadBtnDisabled =
    "bg-[var(--color-surface-variant-low)] text-[rgba(18,19,21,0.35)]";

  const uploadButtonNode = (
    <button
      type="button"
      onClick={onClickUpload}
      disabled={!canUpload || isUploading}
      className={clsx(
        uploadBtnBase,
        canUpload && !isUploading ? uploadBtnEnabled : uploadBtnDisabled,
      )}
    >
      <span className="label-xxlarge-emphasized">업로드</span>
    </button>
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* 상단 여백(상단바 가림 방지) */}
      <div className="h-[120px]" />

      {/* Weekly/Daily/Circle 헤더 주입 영역 */}
      {header ? (
        <div style={{ width: PAGE_WIDTH }} className="mb-[12px]">
          {typeof header === "function" ? header({ uploadButtonNode }) : header}
        </div>
      ) : null}

      {/* header가 없을 때만 기본 타이틀 라인 표시 */}
      {!header ? (
        <div
          className="flex items-center justify-between"
          style={{ width: PAGE_WIDTH }}
        >
          <div className="sub-title-large-emphasized text-on-surface">
            그림 업로드
          </div>
          {uploadButtonNode}
        </div>
      ) : null}

      {/* 업로드 영역 */}
      <div
        className="flex flex-col"
        style={{
          width: PAGE_WIDTH,
          paddingTop: 22,
          paddingBottom: 28,
        }}
      >
        <div
          ref={scrollerRef}
          className="overflow-x-auto overflow-y-hidden"
          onMouseDown={onMouseDownScroller}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}</style>

          <div
            className="hide-scrollbar flex items-center gap-[24px] pb-[12px]"
            style={{
              width: "max-content",
              paddingRight: 8,
              userSelect: "none",
            }}
          >
            {/* 업로드 박스를 맨 앞(왼쪽)에 두기 위한 코드! */}
            <div className="shrink-0">
              <UploadBox onUpload={onAddImage} />
            </div>

            {/* 그 다음 이미지들: 새로 추가되는 건 오른쪽으로 쌓임 */}
            {images.map((file, idx) => {
              const url = URL.createObjectURL(file);
              const isFirst = idx === 0;

              return (
                <div
                  key={`${file.name}-${idx}`}
                  className={clsx(
                    "rounded-[20px] overflow-hidden bg-black shrink-0",
                    isFirst ? "w-[220px] h-[340px]" : "w-[520px] h-[340px]",
                  )}
                >
                  <img
                    src={url}
                    alt={`upload-${idx}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 스크롤 인디케이터: 트랙 클릭/드래그 지원 */}
        <ScrollIndicator width={PAGE_WIDTH} scrollerRef={scrollerRef} />
      </div>

      {/* 체크박스(회색 박스 밖) */}
      <div
        className="flex items-center"
        style={{
          width: PAGE_WIDTH,
          marginTop: 16,
          gap: 11, // 
        }}
      >
        <Checkbox checked={isPrivate} onChange={setIsPrivate}>
          비공개
        </Checkbox>

        <Checkbox checked={allowComment} onChange={setAllowComment}>
          댓글 허용
        </Checkbox>
      </div>

      {/* 회색 박스(작성 영역) */}
      <div
        className="flex flex-col"
        style={{
          width: PAGE_WIDTH,
          height: 414,
          padding: "24px 28px",
          borderRadius: 20,
          background: "var(--color-surface-variant-high)",
          boxSizing: "border-box",
          gap: 16,
          marginTop: 16,
          marginBottom: 40,
        }}
      >
        {/* 설명/내용 */}
        <div className="flex flex-col gap-[10px] w-full">
          <div className="sub-title-large-emphasized text-on-surface">
            설명/내용
          </div>

          <div className="w-full">
            <WriteBodyField value={body} onChange={setBody} maxLength={350} />
          </div>
        </div>

        {/* 해시태그 */}
        <div className="w-full">
          <HashtagField
            value={hashtagInput}
            onChange={setHashtagInput}
            tags={tags}
            onAddTag={(t) => setTags((prev) => [...prev, t])}
            onRemoveTag={(t) => setTags((prev) => prev.filter((x) => x !== t))}
          />
        </div>
      </div>

      {/* 업로드 로딩 오버레이: 반투명 + 로고 드로잉 */}
      {isUploading ? (
        <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center">
          <AnimatedLogoDraw size={120} />
        </div>
      ) : null}
    </div>
  );
}

/* =============================================================================
 * ScrollIndicator (트랙 클릭 점프 + thumb 드래그)
 * ========================================================================== */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function ScrollIndicator({
  width,
  scrollerRef,
}: {
  width: number;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const TRACK_W = width;
  const THUMB_W = Math.min(520, Math.floor(TRACK_W * 0.45));

  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    startClientX: 0,
    startThumbLeft: 0,
  });

  const [thumbLeft, setThumbLeft] = useState(0);

  // scroller -> thumbLeft
  const syncThumbFromScroller = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const maxLeft = TRACK_W - THUMB_W;

    if (maxScroll <= 0) {
      setThumbLeft(0);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    setThumbLeft(clamp(maxLeft * ratio, 0, maxLeft));
  };

  // thumbLeft -> scroller
  const syncScrollerFromThumb = (nextLeft: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const maxLeft = TRACK_W - THUMB_W;

    if (maxLeft <= 0 || maxScroll <= 0) return;

    const ratio = nextLeft / maxLeft;
    el.scrollLeft = ratio * maxScroll;
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncThumbFromScroller();

    const onScroll = () => syncThumbFromScroller();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 트랙 클릭 점프
  const onClickTrack: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement)?.dataset?.thumb === "true") return;

    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const maxLeft = TRACK_W - THUMB_W;
    const nextLeft = clamp(clickX - THUMB_W / 2, 0, maxLeft);

    setThumbLeft(nextLeft);
    syncScrollerFromThumb(nextLeft);
  };

  // thumb 드래그
  const onMouseDownThumb: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0) return;

    dragRef.current.active = true;
    dragRef.current.startClientX = e.clientX;
    dragRef.current.startThumbLeft = thumbLeft;

    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;

      const dx = e.clientX - dragRef.current.startClientX;
      const maxLeft = TRACK_W - THUMB_W;

      const nextLeft = clamp(dragRef.current.startThumbLeft + dx, 0, maxLeft);
      setThumbLeft(nextLeft);
      syncScrollerFromThumb(nextLeft);
    };

    const onUp = () => {
      dragRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thumbLeft, TRACK_W, THUMB_W]);

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ width: TRACK_W, height: 12 }}
      onMouseDown={onClickTrack}
    >
      {/* 회색 트랙 */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: TRACK_W,
          height: 4,
          background: "rgba(18,19,21,0.25)",
        }}
      />

      {/* 검정 thumb */}
      <div
        data-thumb="true"
        className="absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: thumbLeft,
          width: THUMB_W,
          height: 6,
          background: "rgba(18,19,21,0.95)",
        }}
        onMouseDown={onMouseDownThumb}
      />
    </div>
  );
}
