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
          ? myProfileQuery.data?.result?.challenge_calender ??
            myProfileQuery.data?.result?.challengeCalendar
          : userProfileQuery.data?.result?.challenge_calender ??
            userProfileQuery.data?.result?.challengeCalendar
        : undefined;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            
            {/* Banner */}
            <ProfileBanner/>
            
            {/* Body */}
            <div className="mx-auto w-full flex gap-10 px-50">

                <div className="relative flex flex-col w-fit gap-8 -mt-50">
                    <ProfileDashboard context={context} userId={userId} circleId={circleId} />
                    {ui.showCalendar && (
                      <ChallengeCalendar
                        dailyChallengeDates={challengeCalendar?.dailyChallenge ?? []}
                        weeklyChallengeDates={challengeCalendar?.weeklyChallenge ?? []}
                      />
                    )}
                </div>

                <div className="relative top-16 flex-1 min-w-100">
                    <ProfileSubmissions context={context} userId={userId} circleId={circleId} />
                </div>
            </div>

        </div>
    )

}; export default ProfileView;
