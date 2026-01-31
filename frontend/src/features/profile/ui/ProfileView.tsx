import ProfileBanner from "./ProfileBanner";
import ProfileDashboard from "./ProfileDashboard";
import Submissions from "./section/Submissions";

import { ChallengeCalendar } from "../../../components/common/feedback";

import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";

interface ProfileViewProps {
    context: ProfileViewContext;
  }

const ProfileView = ( { context }: ProfileViewProps) => {

    const ui = context.type === "user"
      ? PROFILE_VIEW_CONFIG.user[context.role]
      : PROFILE_VIEW_CONFIG.circle[context.role];


    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            
            {/* Banner */}
            <ProfileBanner/>
            
            {/* Body */}
            <div className="mx-auto w-fit flex gap-[40px]">

                <div className="relative flex flex-col w-fit gap-[32px] -mt-[200px]">
                    <ProfileDashboard context={context} />
                    {ui.showCalendar && <ChallengeCalendar/>}
                </div>

                <div className="relative top-[64px]">
                    <Submissions />
                </div>
            </div>

        </div>
    )

}; export default ProfileView;
