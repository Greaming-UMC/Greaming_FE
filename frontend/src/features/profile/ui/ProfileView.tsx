import ProfileBanner from "./ProfileBanner";
import ProfileDashboard from "./ProfileDashboard";

import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";

interface ProfileViewProps {
    context: ProfileViewContext;
  }

const ProfileView = ( { context }: ProfileViewProps) => {

    const ui = context.type === "user"
      ? PROFILE_VIEW_CONFIG.user[context.role]
      : PROFILE_VIEW_CONFIG.circle[context.role];


    return (
        <div className="w-full h-full flex flex-col">
            
            {/* Banner */}
            <div className="w-fit h-fit"> <ProfileBanner/> </div>
            
            {/* Body */}
            <div className="mx-auto w-fit flex gap-[40px]">

                {/* Dashboard */}
                <ProfileDashboard />

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-6">

                </div>

            </div>

        </div>
    )

}; export default ProfileView;