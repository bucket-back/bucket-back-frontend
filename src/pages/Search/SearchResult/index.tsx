import { useState } from 'react';
import { CommonTabs } from '@/shared/components';
import { SearchWrapper } from './style';
import { SearchItemList, SearchVoteList } from '@/features/search/components';

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
                <SearchItemList />
              </SearchWrapper>
            ),
          },
          {
            label: TABS.VOTE.LABEL,
            value: TABS.VOTE.VALUE,
            content: (
              <SearchWrapper>
                <SearchVoteList />
              </SearchWrapper>
            ),
          },
        ]}
      />
    </>
  );
};

export default SearchResult;
