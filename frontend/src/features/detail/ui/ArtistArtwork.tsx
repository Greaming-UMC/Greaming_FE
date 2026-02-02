import { Card } from "../../../components/common/display";
import { CardCarousel } from "./section/CardCarousel";
import Icon from "../../../components/common/Icon";

export interface Artwork {
  id: number;
  title: string;
  src: string;
  likes?: number;
  comments?: number;
  scraps?: number;
}

interface ArtistArtworkProps {
  artworks: Artwork[];
  userRole?: string;
}

const ArtistArtwork: React.FC<ArtistArtworkProps> = ({
  artworks,
  userRole,
}) => {
  // 데이터가 없으면 아예 섹션을 숨깁니다.
  if (!artworks || artworks.length === 0) {
    return null;
  }

  return (
    <div className="p-6 space-y-12 max-w-6xl mx-auto">
      <CardCarousel
        title="작가의 다른 그림"
        onMoreClick={() => console.log("더보기 페이지로 이동")}
      >
        {artworks.map((art) => (
          <div
            key={art.id}
            className="min-w-[160px] w-[160px] sm:w-[200px] snap-start"
          >
            <Card.Root
              clickable
              hoverEffect
              className="bg-transparent shadow-none border-none group"
            >
              <Card.Media
                src={art.src}
                alt={art.title}
                aspectRatio="aspect-square"
                className="rounded-lg"
              >
                <Card.Overlay className="items-end pb-3 pr-3">
                  {/* 아이콘 + 숫자 컨테이너 (우측 정렬) */}
                  <div className="flex items-center justify-end gap-3 text-on-primary w-full">
                    {/* 1. 좋아요 */}
                    <div className="flex items-center gap-1">
                      <Icon
                        name="like"
                        size={16}
                        className="fill-whion-primaryte"
                      />
                      <span className="text-xs font-medium">
                        {art.likes || 0}
                      </span>
                    </div>

                    {/* 2. 댓글 */}
                    <div className="flex items-center gap-1">
                      <Icon name="chat" size={16} className="fill-on-primary" />
                      <span className="text-xs font-medium">
                        {art.comments || 0}
                      </span>
                    </div>

                    {/* 3. 스크랩/추가 */}
                    <div className="flex items-center gap-1">
                      <Icon name="save" size={16} className="fill-white" />
                      <span className="text-xs font-medium">
                        {art.scraps || 0}
                      </span>
                    </div>
                  </div>
                </Card.Overlay>
              </Card.Media>
            </Card.Root>
          </div>
        ))}
      </CardCarousel>
    </div>
  );
};

export default ArtistArtwork;
