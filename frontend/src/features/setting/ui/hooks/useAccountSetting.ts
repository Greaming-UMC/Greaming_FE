import { useQuery, useMutation } from '@tanstack/react-query';
import { getAccountSettings, deleteAccount } from '../api/api';
import { useToast } from '../../../../components/common/feedback/Toast/ToastProvider';
import type { DeleteAccountRequest } from '../../../../apis/types/account';

export const useAccountSetting = () => {
  const { showToast } = useToast();

  // 🟢 조회를 잠시 비활성화하여 무한 로딩을 방지합니다.
  const { data: accountData } = useQuery({
    queryKey: ['accountSettings'],
    queryFn: getAccountSettings,
    select: (res) => res.result,
    enabled: false, // 👈 백엔드 준비 전까지 자동 호출 방지
  });

  // 계정 삭제 Mutation
  const { mutate: removeAccount, isPending: isDeleting } = useMutation({
    mutationFn: (params: DeleteAccountRequest) => deleteAccount(params),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("계정이 성공적으로 삭제되었습니다.", "success");
        // 삭제 성공 후 메인이나 로그인 페이지로 이동
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
    accountData: accountData || { email: ".", loginType: "GOOGLE", visibility: "PUBLIC" }, // 기본값 제공
    updateStatus: () => showToast("현재 준비 중인 기능입니다.", "error"), 
    removeAccount,
    isLoading: false, // 👈 강제로 로딩 상태 해제
    isDeleting
  };
};
