import { useNavigate } from "react-router-dom";
import Logo from "../../../../components/common/Logo";
import { Button } from "../../../../components/common/input";
import { Divider } from "../../../../components/common";
import SocialLoginButtons from "../../components/SocialLoginButtons";

const AuthContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center w-[900px] h-[684px] bg-building-block">
        <div className="flex flex-col w-[320px] items-center justify-center">
            <Logo name="primary-wordmark" width={320} height={80} title="greaming" />
            <p className="mt-1 sub-title-large text-on-surface-dim text-center">
                그리고 · 공유하고 · 성장하는 커뮤니티
            </p>

            <Button
              variant="onPrimary"
              size="md"
              shape="round"
              widthMode="fill"
              className="mt-10"
              onClick={() => navigate("/home")}
            >
                그리밍 둘러보러가기
            </Button>

            <p className="mt-10 sub-title-medium text-on-surface text-center">
                SNS로 간편하게 시작하기
            </p>
            <div className="mt-4 flex gap-5 justify-center"> 
                <SocialLoginButtons variant="google"/>
                <SocialLoginButtons variant="kakao"/>
            </div>

            <Divider orientation="horizontal" thickness={1} className="mt-10"/>
            <p className="mt-4 body-medium text-on-surface-variant-lowest text-center">
                SSL 보안 연결을 통해 안전하게 로그인 합니다.
                <br />© 2026 Greaming. All rights reserved.
            </p>
        </div>
    </div>
  );
};

export default AuthContainer;
