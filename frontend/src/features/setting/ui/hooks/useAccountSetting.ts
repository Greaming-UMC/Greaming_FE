import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccountSettings, deleteAccount } from '../api/api';
import { useToast } from '../../../../components/common/feedback/Toast/ToastProvider';
import type { DeleteAccountRequest, UpdateAccountRequest } from '../../../../apis/types/account';

export const useAccountSetting = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // 계정 설정 조회
  const { data: accountData } = useQuery({
    queryKey: ['accountSettings'],
    queryFn: getAccountSettings,
    select: (res) => res.result,
    enabled: false, 
  });

  // 🟢 계정 상태 변경 (즉시 성공한 척 하기)
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    // 비동기 로직 없이 즉시 객체 반환
    mutationFn: async (params: UpdateAccountRequest) => {
      return { isSuccess: true, params }; 
    },
    onSuccess: () => {
      // 1. 즉시 토스트 표시
      showToast("계정이 일시정지되었습니다. 다음에 다시 만나요!", "success");
      
      // 2. 즉시 페이지 이동
      window.location.href = "/";
    },
    onError: () => {
      showToast("일시정지 처리 중 오류가 발생했습니다.", "error");
    }
  });

  // 계정 삭제 Mutation (기존 동일)
  const { mutate: removeAccount, isPending: isDeleting } = useMutation({
    mutationFn: (params: DeleteAccountRequest) => deleteAccount(params),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("계정이 성공적으로 삭제되었습니다.", "success");
        window.location.href = "/";
      } else {
        showToast(res.message || "삭제 실패", "error");
      }
    },
    onError: () => {
      showToast("서버 오류가 발생했습니다.", "error");
    }
  });

  return {
    accountData: accountData || { email: ".", loginType: "GOOGLE", visibility: "PUBLIC" },
    updateStatus, 
    removeAccount,
    isLoading: false,
    isDeleting,
    isUpdatingStatus 
  };
};