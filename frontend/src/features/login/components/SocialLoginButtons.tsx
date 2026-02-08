import Icon, { type IconName } from "../../../components/common/Icon";
import { useSocialLogin } from "../hooks/useSocialLogin";
import type { SocialProvider } from "../config/types";

interface SocialLoginButtonProps {
  variant: SocialProvider;
}

type Preset = {
  iconName: IconName;
  ariaLabel: string;
};

const PRESET: Record<SocialProvider, Preset> = {
  google: {
    iconName: "google",
    ariaLabel: "Google 로그인",
  },
  kakao: {
    iconName: "kakao",
    ariaLabel: "Kakao 로그인",
  },
};

const SocialLoginButton = ({ variant }: SocialLoginButtonProps) => {
  const { startSocialLogin } = useSocialLogin();
  const preset = PRESET[variant];

  return (
    <button
      type="button"
      aria-label={preset.ariaLabel}
      className="h-14 w-14 rounded-full flex items-center justify-center state-layer primary-opacity-8"
      onClick={() => startSocialLogin(variant)}
    >
      <Icon name={preset.iconName} size={40} />
    </button>
  );
};

export default SocialLoginButton;
