import mainBackground from "../../../assets/background/main_background.svg";

const ProfileBanner = () => {

    return (
        <div className="h-[376px] w-full">
            <img
                src={mainBackground}
                alt="profile banner"
                className="h-full w-full object-cover"
            />
        </div>
    )

}; export default ProfileBanner;
