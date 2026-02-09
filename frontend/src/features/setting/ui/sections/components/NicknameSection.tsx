import { useMemo } from "react";

import clsx from "clsx";
import Icon from "../../../../../components/common/Icon";
import { BaseField } from "../../../../../components/common";

interface Props {
  value: string;
  status: "unchecked" | "valid" | "invalid";
  onChange: (v: string) => void;
  onCheck: () => void;
  isChecking: boolean;
}

export const NicknameSection = ({ value, status, onChange, onCheck, isChecking }: Props) => {
  const nicknameUI = useMemo(() => {
    if (value.trim().length === 0) return null;
    const configs = {
      unchecked: { icon: "error", color: "text-error", text: "닉네임 중복확인을 해주세요." },
      invalid: { icon: "error", color: "text-error", text: "사용할 수 없는 닉네임입니다." },
      valid: { icon: "check_circle", color: "text-secondary-variant", text: "사용할 수 있는 닉네임입니다." },
    };
    return configs[status];
  }, [value, status]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-1">
        <label className="label-xlarge-emphasized text-on-surface">닉네임</label>
        {nicknameUI && (
          <div className="flex items-center gap-2">
            <Icon name={nicknameUI.icon as any} size={18} className={clsx("fill-current", nicknameUI.color)} />
            <span className={clsx("label-large-emphasized", nicknameUI.color)}>{nicknameUI.text}</span>
          </div>
        )}
      </div>
      <BaseField
        value={value} 
        onChange={onChange} 
        widthMode="fill" 
        tone="surfaceVariantHigh" 
        placeholder="8자 이내로 입력하세요" 
        action={{ 
          label: isChecking ? "확인 중" : "중복확인", 
          onClick: onCheck,
          disabled: isChecking || !value.trim(),
          className: "!bg-surface-variant-lowest !text-white !w-[80px] !h-[32px] !rounded-full label-medium-emphasized"
        }} 
        className="label-large" 
      />
    </div>
  );
};