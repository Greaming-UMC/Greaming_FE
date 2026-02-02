import { useMemo } from "react";
import { Card, EmptyState } from "../../../components/common"; 
import Icon from "../../../components/common/Icon"

/* -------------------------------------------------------------------------- */
/* 1. [Type] 타입 정의                                                        */
/* -------------------------------------------------------------------------- */

// (기존에 쓰시던 타입 그대로 유지하시면 됩니다)
export interface Artwork {
  id: number;
  title: string;
  src: string;
}

interface ArtistArtworkProps {
  artworks?: Artwork[]; // 부모에게 받는 작품 배열
  userRole?: string;    // (필요하다면 유지)
}

/* -------------------------------------------------------------------------- */
/* 2. [Component] 작가의 다른 그림                                             */
/* -------------------------------------------------------------------------- */

const ArtistArtwork = ({ artworks = [], userRole }: ArtistArtworkProps) => {
  
  // ✅ 1. 데이터가 비었는지 확인
  const isEmpty = useMemo(() => {
    return !artworks || artworks.length === 0;
  }, [artworks]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 헤더 부분 */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-on-surface">작가의 다른 그림</span>
        
        {/* 데이터가 있을 때만 '더보기' 버튼 표시 */}
        {!isEmpty && (
          <button className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors">
            더보기 <Icon name="chevron_right" size={16} />
          </button>
        )}
      </div>

      {/* ✅ 2. 조건부 렌더링: 비었으면 EmptyState, 있으면 리스트 출력 */}
      {isEmpty ? (
        <div className="py-10 w-full"> {/* 여백 좀 줘서 예쁘게 */}
            <EmptyState 
                title="작가가 등록한 다른 작품이 없습니다" 
                icon="char_sad" // 아이콘 이름 확인 필요
            />
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {artworks.map((art) => (
            <div key={art.id} className="min-w-[200px] w-[200px] shrink-0">
              <Card.Root clickable hoverEffect className="group">
                <Card.Media
                  src={art.src}
                  alt={art.title}
                  aspectRatio="aspect-square"
                  className="rounded-lg bg-surface-variant-low"
                />
                <div className="mt-2 text-sm font-medium truncate text-on-surface">
                  {art.title}
                </div>
              </Card.Root>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistArtwork;