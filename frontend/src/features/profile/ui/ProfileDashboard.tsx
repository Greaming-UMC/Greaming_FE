import { useNavigate } from "react-router-dom";

import ModalActionButton from "../components/modalActionButton";
import ProfileSelf from "./section/ProfileSelf";

import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";

interface ProfileViewProps {
    context: ProfileViewContext;
}

const ProfileDashboard = ( { context }: ProfileViewProps) => {

    const ui = context.type === "user"
      ? PROFILE_VIEW_CONFIG.user[context.role]
      : PROFILE_VIEW_CONFIG.circle[context.role];
    const navigator = useNavigate();


    return (
        <div className="relative w-[400px] h-fit flex flex-col gap-[32px] bg-surface rounded-large shadow-xl px-[24px] py-[64px]">

            {/* Button */}
            {/*{ui.showEditButton && */}
              <div className="absolute right-[24px] top-[16px]">
                <ModalActionButton onEdit={() => navigator("/setting/Profile")}/>
              </div>
            {/*}*/}

            {/* Profile */}
            <ProfileSelf />

        </div>
    )

}; export default ProfileDashboard;
