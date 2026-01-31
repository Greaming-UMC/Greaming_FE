import ProfileView from "../../features/profile/ui/ProfileView";

const ProfilePage = () => {
  return <ProfileView context={{ type: "user", role: "self" }} />;
};

export default ProfilePage;
