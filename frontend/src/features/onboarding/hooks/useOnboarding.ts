import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerOnboardingInfo } from '../api/api';
import { useToast } from '../../../components/common/feedback/Toast/ToastProvider';
import type { OnboardingDraft } from '../model/useOnboardingSteps';


export const useOnboarding = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { mutate: submitOnboarding, isPending: isSubmitting } = useMutation({
    mutationFn: (formData: OnboardingDraft) => registerOnboardingInfo(formData),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("그리밍에 오신 걸 환영합니다!", "success");
        
        // 성공 시 전체 쿼리 무효화 후 메인으로 이동
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

  return {
    submitOnboarding,
    isSubmitting
  };
};
