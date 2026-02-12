import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfileSettings, updateProfileSettings, checkNickname } from '../api/api';
import { useToast } from '../../../../components/common/feedback/Toast/ToastProvider';
import type { UserInformations } from '../../../../apis/types/common';
import { PROFILE_SETTING_KEYS } from './profileSettingKeys';
;

export const useProfileSetting = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  // 1. 초기 데이터 조회 (GET)
  const { data: profileData, isLoading } = useQuery({
    queryKey: PROFILE_SETTING_KEYS.myProfile(), // 분리된 키 사용
    queryFn: getProfileSettings,
    select: (res) => res.result?.user_information, 
  });

  // 2. 프로필 정보 수정 저장 (PUT)
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (formData: UserInformations) => updateProfileSettings(formData),
    onSuccess: (res) => {
      if (res.isSuccess) {
        showToast("프로필이 성공적으로 변경되었습니다.", "success");
        // 저장 성공 시 해당 키의 캐시를 새로고침
        queryClient.invalidateQueries({ queryKey: PROFILE_SETTING_KEYS.all }); 
      } else {
        showToast(res.message || "저장에 실패했습니다.", "error");
      }
    },
    onError: () => {
      showToast("서버 오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  });

  // 3. 닉네임 중복 확인
  const validateNickname = async (nickname: string) => {
    try {
      const res = await checkNickname(nickname);
      // 서버 명세의 'isAsvailable' 필드 활용
      return res.result?.isAsvailable ?? false; 
    } catch {
      return false;
    }
  };

  return { 
    profileData,
    updateProfile,
    validateNickname,
    isLoading,
    isUpdating
  };
};