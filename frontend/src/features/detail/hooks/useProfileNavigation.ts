import { useNavigate } from "react-router-dom";
import { useMyProfile } from "./queries/useMyProfile";

export const useProfileNavigation = () => {
  const navigate = useNavigate();
  const { data: profileData } = useMyProfile();

  // UserInformations 타입에 userId가 없으므로 any로 캐스팅하여 접근
  const myId =
    (profileData?.result?.userInformation as any)?.userId ||
    (profileData?.result?.user_information as any)?.userId;

  const navigateToProfile = (userId: number) => {
    // userId가 없거나 0인 경우 예외 처리
    if (!userId) {
      console.warn("User ID is missing or invalid:", userId);
      return;
    }

    if (myId && userId === Number(myId)) {
      navigate("/profile/self");
    } else {
      navigate(`/profile/user/${userId}`);
    }
  };

  return { navigateToProfile };
};
