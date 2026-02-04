import { useNavigate } from "react-router-dom";

import DropdownButton from "../components/DropDownButton";
import ProfileSelf from "./section/ProfileSelf";
import ProfileOther from "./section/ProfileOther";
import ProfileCircle from "./section/ProfileCircle";

import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";

interface ProfileViewProps {
    context: ProfileViewContext;
    userId?: number;
    circleId?: number;
}

const ProfileDashboard = ( { context, userId, circleId }: ProfileViewProps) => {

    const ui = context.type === "user"
      ? PROFILE_VIEW_CONFIG.user[context.role]
      : PROFILE_VIEW_CONFIG.circle[context.role];
    const navigator = useNavigate();


    return (
        <div className="relative w-[400px] h-fit flex flex-col gap-[32px] bg-surface rounded-large shadow-xl px-[24px] py-[64px]">

            {/* Button */}
            {ui.showEditButton && (
              <div className="absolute right-[24px] top-[16px]">
                <DropdownButton onEdit={() => navigator("/setting/Profile")} />
              </div>
            )}

            {/* Profile */}
            {context.type === "user" ? (
              context.role === "self" ? (
                <ProfileSelf />
              ) : (
                <ProfileOther userId={userId} />
              )
            ) : (
              <ProfileCircle circleId={circleId} />
            )}

        </div>
    )

}; export default ProfileDashboard;
