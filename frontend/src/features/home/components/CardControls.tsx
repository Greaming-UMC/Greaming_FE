import { useState } from "react";
import FilterTabs from "../ui/controls/FilterTabs";
import SortTabs from "../ui/controls/SortTabs";
import HomeSearchInput from "../ui/controls/HomeSearchInput";
import { DatePickerDayModal, DatePickerWeekModal } from "../../../components/common";
import { Chip } from "../../../components/common/display/Chip";
import type { HomeView } from "./type";

interface CardControlsProps {
  view: HomeView;
}

const CardControls = ({ view }: CardControlsProps) => {
  const [keyword, setKeyword] = useState("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [filter, setFilter] = useState<"ALL" | "PERSONAL">("ALL");
  const [sort, setSort] = useState<"LATEST" | "POPULAR" | "RECOMMEND">("LATEST");

  // 검색어 태그 추가 핸들러
  const handleAddTag = () => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    
    // 이미 존재하는 태그면 중복 추가 방지
    if (!searchTags.includes(trimmedKeyword)) {
      setSearchTags((prev) => [...prev, trimmedKeyword]);
    }
    setKeyword("");
  };

  // 태그 삭제 핸들러
  const handleRemoveTag = (tagToRemove: string) => {
    setSearchTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <section className="w-full pt-10 pb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <FilterTabs value={filter} onChange={setFilter} />
        <SortTabs value={sort} onChange={setSort} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <HomeSearchInput 
            value={keyword} 
            onChange={setKeyword} 
            onSearch={handleAddTag} 
          />

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {searchTags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`} 
                onDelete={() => handleRemoveTag(tag)}
                variant="filled"
                className="bg-surface-variant-lowest text-on-surface-variant-bright whitespace-nowrap"
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