import { useParams } from "react-router-dom";
import ProfileView from "../../features/profile/ui/ProfileView";

type ProfilePageMode = "self" | "user" | "circle";

type ProfilePageProps = {
  mode: ProfilePageMode;
};

const ProfilePage = ({ mode }: ProfilePageProps) => {
  const params = useParams();
  const userId = mode === "user" ? Number(params.userId) : undefined;
  const circleId = mode === "circle" ? Number(params.circleId) : undefined;

  if (mode === "user" && (userId === undefined || Number.isNaN(userId))) {
    return null;
  }
  if (mode === "circle" && (circleId === undefined || Number.isNaN(circleId))) {
    return null;
  }

  const context =
    mode === "self"
      ? { type: "user", role: "self" }
      : mode === "user"
        ? { type: "user", role: "other" }
        : { type: "circle", role: "guest" };

  return (
    <ProfileView context={context} userId={userId} circleId={circleId} />
  );
};

export default ProfilePage;
