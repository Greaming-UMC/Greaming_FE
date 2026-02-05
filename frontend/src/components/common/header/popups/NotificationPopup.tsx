import { ListBase } from '../../input';
import Icon from '../../Icon';

const NotificationPopup = () => {
  return (
    <div className="absolute top-full right-0 mt-3 w-[400px] bg-surface rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="px-4 py-3 border-b border-surface-variant-low">
        <h3 className="font-bold text-primary">알림</h3>
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
              className="text-primary"
            />
          }
          title="000님이 회원님의 그림을 좋아합니다."
          subtitle={{ variant: 'text', value: '방금 전' }}
          className="bg-white hover:bg-surface-variant-low transition-colors"
          trailing={<Icon name="dot_vertical" size={16} className="text-primary" />}
        />
      </div>
    </div>
  );
};

export default NotificationPopup;