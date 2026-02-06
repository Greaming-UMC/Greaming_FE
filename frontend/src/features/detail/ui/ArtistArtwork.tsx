import { useMemo } from "react";
import { Card, EmptyState } from "../../../components/common"; 
import Icon from "../../../components/common/Icon"

/* -------------------------------------------------------------------------- */
/* 1. [Type] 타입 정의                                                        */
/* -------------------------------------------------------------------------- */

// (기존에 쓰시던 타입 그대로 유지하시면 됩니다)
export interface Artwork { // TODO: apis/types/work.ts 의 UserWork 타입과 통합을 고려해보세요.
  id: number;
  title: string;
  src: string;
  likes_count: number;
  comment_count: number;
  bookmark_count: number;
}

interface ArtistArtworkProps {
  artworks?: Artwork[]; // 부모에게 받는 작품 배열
}

/* -------------------------------------------------------------------------- */
/* 2. [Component] 작가의 다른 그림                                             */
/* -------------------------------------------------------------------------- */

const ArtistArtwork = ({ artworks = [] }: ArtistArtworkProps) => {
  
  const isEmpty = useMemo(() => {
    return !artworks || artworks.length === 0;
  }, [artworks]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 헤더 부분 */}
      <div className="flex items-center justify-between">
        <span className="text-main-title-small font-semi-bold text-on-surface pretendard mt-20">작가의 다른 그림</span>
        
        {/* 데이터가 있을 때만 '더보기' 버튼 표시 */}
        {!isEmpty && (
          <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-label-xxlarge">
            더보기 <Icon name="ad" size={24} />
          </button>
        )}
      </div>

      {/* 2. 조건부 렌더링: 비었으면 EmptyState, 있으면 리스트 출력 */}
      {isEmpty ? (
        <div className="py-10 w-full"> 
            <EmptyState 
                title="작가가 등록한 다른 작품이 없습니다" 
                icon="char_sad" 
                iconSize={132}
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
                >
                  <Card.Overlay className="items-end pb-3 pr-3">
                    <div className="flex items-center justify-end gap-3 text-on-primary">
                      {/* 좋아요 */}
                      <div className="flex items-center gap-1">
                        <Icon name="like" size={16} className="fill-on-primary" />
                        <span className="text-xs font-medium">{art.likes_count}</span>
                      </div>
                      {/* 댓글 */}
                      <div className="flex items-center gap-1">
                        <Icon name="chat" size={16} className="fill-on-primary" />
                        <span className="text-xs font-medium">{art.comment_count}</span>
                      </div>
                      {/* 저장 */}
                      <div className="flex items-center gap-1">
                        <Icon name="save" size={16} className="fill-on-primary" />
                        <span className="text-xs font-medium">{art.bookmark_count}</span>
                      </div>
                    </div>
                  </Card.Overlay>
                </Card.Media>
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
