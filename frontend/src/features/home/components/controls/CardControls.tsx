import { useState } from "react";
import FilterTabs from "./FilterTabs";
import SortTabs from "./SortTabs";
import HomeSearchInput from "./HomeSearchInput";
import type { HomeView } from "../type";
import { DatePickerDayModal, DatePickerWeekModal } from "../../../../components/common";

interface CardControlsProps {
  view: HomeView;
}

const CardControls = ({ view }: CardControlsProps) => {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PERSONAL">("ALL");
  const [sort, setSort] = useState<"LATEST" | "POPULAR" | "RECOMMEND">("LATEST");

  return (
    <section className="w-full pt-10 pb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <FilterTabs value={filter} onChange={setFilter} />
        <SortTabs value={sort} onChange={setSort} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <HomeSearchInput value={keyword} onChange={setKeyword} />

        {view !== "HOME" && (
          <div className="shrink-0 animate-fadeIn">
            {view === "DAILY" ? <DatePickerDayModal /> : <DatePickerWeekModal />}
          </div>
        )}
      </div>
    </section>
  );
};

export default CardControls;
