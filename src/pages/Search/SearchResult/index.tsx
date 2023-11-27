import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import { SearchWrapper } from './style';
import { SearchItemList, SearchVoteList } from '@/features/search/components';
import { SearchListProps } from '@/pages/Search/SearchMain';

const TABS = {
  ITEM: {
    VALUE: 'item',
    LABEL: '아이템',
  },
  VOTE: {
    VALUE: 'vote',
    LABEL: '투표',
  },
};

const SearchResult = () => {
  const { keyword } = useOutletContext<SearchListProps>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <>
      <CommonTabs
        padding="1rem 0"
        currentTabIndex={currentIndex}
        tabsType="line"
        isFitted
        onClick={(value) => (value.includes('item') ? setCurrentIndex(0) : setCurrentIndex(1))}
        tabsData={[
          {
            label: TABS.ITEM.LABEL,
            value: TABS.ITEM.VALUE,
            content: (
              <SearchWrapper>
                <SearchItemList keyword={keyword} />
              </SearchWrapper>
            ),
          },
          {
            label: TABS.VOTE.LABEL,
            value: TABS.VOTE.VALUE,
            content: (
              <SearchWrapper>
                <SearchVoteList keyword={keyword} />
              </SearchWrapper>
            ),
          },
        ]}
      />
    </>
  );
};

export default SearchResult;
