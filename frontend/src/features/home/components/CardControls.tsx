import { useState } from "react";
import FilterTabs from "../ui/controls/FilterTabs";
import SortTabs from "../ui/controls/SortTabs";
import HomeSearchInput from "../ui/controls/HomeSearchInput";
import { DatePickerDayModal, DatePickerWeekModal } from "../../../components/common";
import { Chip } from "../../../components/common/display/Chip";
import type { HomeView } from "./type";
import type { CheckSubmissionType, SortBy } from "../../../apis/types/common";

interface CardControlsProps {
  view: HomeView;

  type: CheckSubmissionType;
  sort: SortBy;
  tags: string[];

  onChangeType: (value: CheckSubmissionType) => void;
  onChangeSort: (value: SortBy) => void;
  onChangeTags: (value: string[]) => void;

  dateTimeIso: string;
  onChangeDateTimeIso: (value: string) => void;
}

const CardControls = ({
  view,
  type,
  sort,
  tags,
  onChangeType,
  onChangeSort,
  onChangeTags,
  // TODO : 캘린더 API 연동
}: CardControlsProps) => {
  const [keyword, setKeyword] = useState("");

  const handleAddTag = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    const exists = tags.some((t) => t.toLowerCase() === trimmed.toLowerCase());
    if (!exists) onChangeTags([...tags, trimmed]);

    setKeyword("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChangeTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <section className="w-full pt-10 pb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <FilterTabs value={type} onChange={onChangeType} />
        <SortTabs value={sort} onChange={onChangeSort} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <HomeSearchInput value={keyword} onChange={setKeyword} onSearch={handleAddTag} />

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                onDelete={() => handleRemoveTag(tag)}
                variant="filled"
                className="flex items-center bg-surface-variant-lowest text-on-surface-variant-bright text-2xl h-[32px] font-medium whitespace-nowrap"
              />
            ))}
          </div>
        </div>

        {view !== "HOME" && (
          <div className="shrink-0 animate-fadeIn ml-4">
            {view === "DAILY" ? <DatePickerDayModal /> : <DatePickerWeekModal />}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardControls;
