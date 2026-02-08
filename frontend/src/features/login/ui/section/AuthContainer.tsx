import { useNavigate } from "react-router-dom";
import Logo from "../../../../components/common/Logo";
import { Divider } from "../../../../components/common";
import SocialLoginButtons from "../../components/SocialLoginButtons";

const AuthContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center w-[995px] h-[500px] bg-building-block">
        <div className="flex flex-col w-[320px] items-center justify-center">
            <p className="sub-title-large text-on-surface-dim text-center">
                그리고 · 공유하고 · 성장하는 커뮤니티
            </p>            
            <Logo name="primary-wordmark" width={320} height={80} title="greaming" className="mt-3"/>

            <Divider orientation="horizontal" thickness={1} className="mt-9"/>
            <p className="mt-4 sub-title-medium text-on-surface-variant-lowest text-center">
                SNS로 간편하게 시작하기
            </p>
            <div className="mt-3 flex gap-10 justify-center"> 
                <SocialLoginButtons variant="google"/>
                <SocialLoginButtons variant="kakao"/>
            </div>
        </div>
    </div>
  );
};

export default AuthContainer;
