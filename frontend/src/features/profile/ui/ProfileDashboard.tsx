import { useNavigate } from "react-router-dom";

import ModalActionButton from "../components/modalActionButton";

import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";

interface ProfileViewProps {
    context: ProfileViewContext;
}

const ProfileView = ( { context }: ProfileViewProps) => {

    const ui = context.type === "user"
      ? PROFILE_VIEW_CONFIG.user[context.role]
      : PROFILE_VIEW_CONFIG.circle[context.role];
    const navigator = useNavigate();


    return (
        <div className="w-[400px] h-fit flex flex-col gap-[32px]">

            {/* Button */}
            {ui.showEditButton && 
              <div className="absolute right-[24px] top-[16px]">
                <ModalActionButton onEdit={() => navigator("/setting/Profile")}/>
              </div>
            }



        </div>
    )

}; export default ProfileView;