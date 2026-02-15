import { useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, EmptyState } from "../../../components/common";
import Icon from "../../../components/common/Icon";
import type { UserSubmission } from "../../../apis/types/submission/getUserSubmissions";

/* -------------------------------------------------------------------------- */
/* 1. [Type] 타입 정의                                                        */
/* -------------------------------------------------------------------------- */

interface ArtistArtworkProps {
  artworks?: UserSubmission[]; // 부모에게 받는 작품 배열
}

/* -------------------------------------------------------------------------- */
/* 2. [Component] 작가의 다른 그림                                             */
/* -------------------------------------------------------------------------- */

const ArtistArtwork = ({ artworks = [] }: ArtistArtworkProps) => {
  const navigate = useNavigate();
  const isEmpty = useMemo(() => {
    return !artworks || artworks.length === 0;
  }, [artworks]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 헤더 부분 */}
      <div className="flex items-center justify-between mt-20">
        <span className="text-main-title-small font-semi-bold text-on-surface pretendard">
          작가의 다른 그림
        </span>

        {/* 데이터가 있을 때만 '더보기' 버튼 표시 */}
        {!isEmpty && (
          <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <p className="text-label-xxlarge font-semibold">더보기</p> <Icon name="add" size={24} />
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
            <div key={art.submissionId} className="min-w-[200px] w-[200px] shrink-0">
              <Card.Root
                clickable
                hoverEffect
                className="group"
                onClick={() => navigate(`/detail/${art.submissionId}`)}
              >
                <Card.Media
                  src={art.thumbnailUrl}
                  alt={art.nickname} // API 응답에 title이 없으므로 nickname으로 대체
                  aspectRatio="aspect-square"
                  className="rounded-lg bg-surface-variant-low"
                >
                  <Card.Overlay className="items-end pb-3 pr-3">
                    <div className="flex items-center justify-end gap-3 text-on-primary">
                      {/* 좋아요 */}
                      <div className="flex items-center gap-1">
                        <Icon name="like" size={16} className="fill-on-primary" />
                        <span className="text-xs font-medium">{art.likesCount}</span>
                      </div>
                      {/* 댓글 */}
                      <div className="flex items-center gap-1">
                        <Icon name="chat" size={16} className="fill-on-primary" />
                        <span className="text-xs font-medium">{art.commentCount}</span>
                      </div>
                      {/* 저장 */}
                      <div className="flex items-center gap-1">
                        <Icon name="save" size={16} className="fill-on-primary" />
                        <span className="text-xs font-medium">{art.bookmarkCount}</span>
                      </div>
                    </div>
                  </Card.Overlay>
                </Card.Media>
                <div className="mt-2 text-sm font-medium truncate text-on-surface">
                  {/* API 응답에 title이 없으므로 표시하지 않거나 다른 정보(예: nickname)로 대체 가능 */}
                </div>
              </Card.Root>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 최적화: React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지합니다.
export default memo(ArtistArtwork);
