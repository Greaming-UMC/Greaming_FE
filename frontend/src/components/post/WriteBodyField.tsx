import React from "react";
import { TextAreaField } from "../common/input/TextAreaField/TextAreaField";
// 큰 박스
type WriteBodyFieldProps = {
  value: string;
  onChange: (v: string) => void;
};

export const WriteBodyField = ({ value, onChange }: WriteBodyFieldProps) => {
  return (
    <div
      className="bg-surface rounded-[10px] flex flex-col gap-[12px]"
      style={{
        width: 1696,
        minHeight: 183,      // Hug(183px) 느낌을 “최소 높이”로 보장
        padding: 12,
        boxSizing: "border-box",
      }}
    >

      {/* 여기서는  기존 TextAreaField를 “circle용 variant”로 쓰지 않고
          그냥 textarea만 필요하니까 직접 textarea로 조합하는 게 가장 깔끔함 */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="작성하기"
        maxLength={600}
        className="w-full flex-1 resize-none bg-transparent outline-none body-large-emphasized placeholder:text-on-surface-variant-lowest overflow-y-auto"
      />

      <div className="flex justify-end label-medium text-on-surface-variant-lowest">
        {value.length}/600
      </div>
    </div>
  );
};
