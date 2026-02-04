import ProfileBanner from "./ProfileBanner";
import ProfileDashboard from "./ProfileDashboard";
import ProfileSubmissions from "./ProfileSubmissions";

import { ChallengeCalendar } from "../../../components/common/feedback";

import { useMyProfile, useUserProfile } from "../hooks";
import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";

interface ProfileViewProps {
    context: ProfileViewContext;
    userId?: number;
    circleId?: number;
  }

const ProfileView = ( { context, userId, circleId }: ProfileViewProps) => {

    const ui = context.type === "user"
      ? PROFILE_VIEW_CONFIG.user[context.role]
      : PROFILE_VIEW_CONFIG.circle[context.role];

    const myProfileQuery = useMyProfile({
      enabled: context.type === "user" && context.role === "self",
    });
    const userProfileQuery = useUserProfile(
      context.type === "user" && context.role === "other" ? userId : undefined,
    );

    const challengeCalendar =
      context.type === "user"
        ? context.role === "self"
          ? myProfileQuery.data?.result?.challenge_calender
          : userProfileQuery.data?.result?.challenge_calender
        : undefined;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            
            {/* Banner */}
            <ProfileBanner/>
            
            {/* Body */}
            <div className="mx-auto w-full flex gap-[40px] px-[200px]">

                <div className="relative flex flex-col w-fit gap-[32px] -mt-[200px]">
                    <ProfileDashboard context={context} userId={userId} circleId={circleId} />
                    {ui.showCalendar && (
                      <ChallengeCalendar
                        dailyChallengeDates={challengeCalendar?.dailyChallenge ?? []}
                        weeklyChallengeDates={challengeCalendar?.weeklyChallenge ?? []}
                      />
                    )}
                </div>

                <div className="relative top-[64px] flex-1 min-w-[400px]">
                    <ProfileSubmissions context={context} userId={userId} circleId={circleId} />
                </div>
            </div>

        </div>
    )

}; export default ProfileView;
