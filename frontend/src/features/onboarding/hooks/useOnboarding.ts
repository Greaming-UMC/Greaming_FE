import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { checkNickname, registerOnboardingInfo,  } from '../api/api'; 
import { useToast } from '../../../components/common/feedback/Toast/ToastProvider';
import type { UserInformations } from '../../../apis/types/common';

export const useOnboarding = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // 1. 온보딩 정보 최종 등록 (기존 로직)
  const { mutate: submitOnboarding, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: UserInformations) => registerOnboardingInfo(formData),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("그리밍에 오신 걸 환영합니다!", "success");
        queryClient.invalidateQueries();
        navigate("/home", { replace: true });
      } else {
        showToast(res.message || "정보 등록에 실패했습니다.", "error");
      }
    },
    onError: () => {
      showToast("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", "error");
    }
  });

  const validateNickname = async (nickname: string) => {
  // 🟢 앞뒤 공백 제거 (매우 중요!)
  const cleanNickname = nickname.trim(); 
  
  console.log("🛠 [검증 시작] 공백 제거된 입력값:", `|${cleanNickname}|`); 

  try {
    // 🟢 cleanNickname을 사용하여 API 호출
    const res = await checkNickname(cleanNickname); 

    console.log("📡 [서버 응답 데이터]:", res);
    
    if (res && res.result) {
      return res.result.isAvailable;
    }
    return false;
  } catch (error) {
    console.error("❌ [API 호출 에러]:", error);
    return false;
  }
};
  return {
    submitOnboarding,
    isSubmitting,
    validateNickname // 🟢 컴포넌트에서 사용할 수 있게 반환
  };
};