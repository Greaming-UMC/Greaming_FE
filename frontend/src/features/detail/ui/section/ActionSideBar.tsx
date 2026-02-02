import Icon from "../../../../components/common/Icon";



interface ActionSideBarProps {
  likes: number;
  comments: number;
  scraps: number; 
}

const ActionSideBar = ({ likes, comments, scraps }: ActionSideBarProps) => {
  return (
    <div className="flex flex-col gap-6 items-center sticky top-24 h-fit">
      {/* 좋아요 */}
      <button className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 rounded-full bg-primary border  flex items-center justify-center shadow-sm transition-colors">
          <Icon name="like" size={24} className="text-on-primary" />
        </div>
        <span className="text-xs font-medium text-on-surface-variant">{likes}</span>
      </button>

      {/* 댓글 */}
      <button className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 rounded-full bg-primary border   flex items-center justify-center shadow-sm group-hover:bg-surface-variant-lowest transition-colors">
          <Icon name="chat" size={24} className="text-on-primary" />
        </div>
        <span className="text-xs font-medium text-on-surface-variant">{comments}</span>
      </button>

      {/* 스크랩/공유 */}
      <button className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 rounded-full bg-primary border  flex items-center justify-center shadow-sm group-hover:bg-surface-variant-lowest transition-colors">
          <Icon name="save" size={24} className="text-on-primary" />
        </div>
        <span className="text-xs font-medium text-on-surface-variant">{scraps}</span>
      </button>
    </div>
  );
};

export default ActionSideBar;