import type { IconName } from "../../../components/common/Icon";
import { Button } from "../../../components/common/input";
import { useSocialLogin } from "../hooks/useSocialLogin";
import type { SocialProvider } from "../config/types";

interface SocialLoginButtonProps {
  iconName: IconName;
  provider: SocialProvider;
  ariaLabel: string;
}

const SocialLoginButton = ({
  iconName,
  provider,
  ariaLabel,
}: SocialLoginButtonProps) => {
  const { startSocialLogin } = useSocialLogin();

  return (
    <Button
      variant="text"
      size="lg"
      shape="round"
      widthMode="fixed"
      width="56px"
      icon={iconName}
      aria-label={ariaLabel}
      onClick={() => startSocialLogin(provider)}
    />
  );
};

export default SocialLoginButton;
