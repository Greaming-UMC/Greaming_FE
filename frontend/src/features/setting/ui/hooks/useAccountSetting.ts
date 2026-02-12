import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccountSettings, updateAccountStatus, deleteAccount } from '../api/api';
import { useToast } from '../../../../components/common/feedback/Toast/ToastProvider';
import type { DeleteAccountRequest, UpdateAccountRequest } from '../../../../apis/types/account';

export const useAccountSetting = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // 1. 계정 설정 조회 (GET)
  const { data: accountData, isLoading } = useQuery({
    queryKey: ['accountSettings'], // 또는 ACCOUNT_SETTING_KEYS.all
    queryFn: getAccountSettings,
    select: (res) => res.result, // CheckSettingsResult 반환
  });

  // 2. 계정 상태/공개 범위 수정 (PUT)
  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: (params: UpdateAccountRequest) => updateAccountStatus(params),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("계정 설정이 변경되었습니다.", "success");
        queryClient.invalidateQueries({ queryKey: ['accountSettings'] });
      } else {
        showToast(res.message || "변경에 실패했습니다.", "error");
      }
    },
    onError: () => {
      showToast("서버 오류가 발생했습니다.", "error");
    }
  });

  // 3. 계정 삭제 (DELETE)
  const { mutate: removeAccount, isPending: isDeleting } = useMutation({
    mutationFn: (params: DeleteAccountRequest) => deleteAccount(params),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("계정이 삭제되었습니다. 이용해 주셔서 감사합니다.", "success");
        // 삭제 후 로그인 페이지로 이동 등의 로직 추가 가능
      } else {
        showToast(res.message || "삭제 실패", "error");
      }
    }
  });

  return {
    accountData,
    updateStatus,
    removeAccount,
    isLoading,
    isUpdating,
    isDeleting
  };
};