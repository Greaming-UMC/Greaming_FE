import { useState } from 'react';
import HomeFilterTabs from './HomeFilterTabs';
import HomeSearchInput from './HomeSearchInput';
import HomeSortTabs from './HomeSortTabs';

const HomeCardControls = () => {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PERSONAL'>('ALL');
  const [sort, setSort] = useState<'LATEST' | 'POPULAR' | 'RECOMMEND'>('LATEST');

  return (
    <section className="mb-6">
      {/* 상단: 필터 + 정렬 */}
      <div className="flex items-center justify-between mb-4">
        <HomeFilterTabs value={filter} onChange={setFilter} />
        <HomeSortTabs value={sort} onChange={setSort} />
      </div>

      {/* 하단: 검색 */}
      <HomeSearchInput
        value={keyword}
        onChange={setKeyword}
      />
    </section>
  );
};

export default HomeCardControls;
