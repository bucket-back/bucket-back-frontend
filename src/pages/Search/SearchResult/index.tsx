import { useState } from 'react';
import { CommonTabs } from '@/shared/components';
import { Container } from './style';

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
      <Container>
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
              content: <>item</>,
            },
            {
              label: TABS.VOTE.LABEL,
              value: TABS.VOTE.VALUE,
              content: <>vote</>,
            },
          ]}
        />
      </Container>
    </>
  );
};

export default SearchResult;
