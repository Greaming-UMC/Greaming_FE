import { ListBase } from "../../../../components/common/input";
import Icon from "../../../../components/common/Icon";

const NotificationPopup = () => {
  return (
    <div className="w-[400px] bg-surface rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="px-4 py-3 border-b border-surface-variant-low">
        <h3 className="font-semibold text-on-surface">알림</h3>
      </div>

      <div className="max-h-[320px] overflow-y-auto">
        <ListBase
          variant="notification"
          size="lg"
          align="left"
          leading={
            <Icon
              name="like_solid"
              size={32}
              className="text-on-surface"
            />
          }
          title="000님이 회원님의 그림을 좋아합니다."
          subtitle={{ variant: 'text', value: '방금 전' }}
          className="bg-surface"
          trailing={<Icon name="dots_vertical" size={16} className="text-on-surface" />}
        />
      </div>
    </div>
  );
};

export default NotificationPopup;
