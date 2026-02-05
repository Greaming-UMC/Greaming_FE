import kakaoPng from "../../../assets/icon/multi/kakaotalk.svg";
import googlePng from "../../../assets/icon/multi/google.svg";

export function SocialLoginButtons() {
  return (
    <div className="flex items-center justify-center gap-6">
      {/* Google */}
      <button
        type="button"
        className="
          flex h-[56px] w-[56px]
          items-center justify-center
          bg-surface
          rounded-[var(--radius-full)]
          state-layer primary-opacity-8
        "
        onClick={() => console.log("google login")}
      >
        <img
          src={googlePng}
          alt="Google"
          className="h-[56px] w-[56px]"
          draggable={false}
        />
      </button>

      {/* Kakao */}
      <button
        type="button"
        className="
          flex h-[56px] w-[56px]
          items-center justify-center
          bg-transparent
          rounded-[var(--radius-full)]
          state-layer primary-opacity-8
        "
        onClick={() => console.log("kakao login")}
      >
        <img
          src={kakaoPng}
          alt="KakaoTalk"
          className="h-[56px] w-[56px]"
          draggable={false}
        />
      </button>
    </div>
  );
}
