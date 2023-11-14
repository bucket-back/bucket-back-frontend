import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { CommonDivider, CommonTabs } from '@/shared/components';
import { FeedItem } from '@/features/feed/components';

const hobby = ['cycle', 'swim', 'basketball'];

const FeedHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabIndex = hobby.indexOf(searchParams.get('hobby') || hobby[0]);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        searchParams.set('hobby', value);
        setSearchParams(searchParams);
      }}
      tabsData={[
        {
          value: 'cycle',
          label: '자전거',
          content: (
            <>
              <Contianer>
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
              </Contianer>
            </>
          ),
        },
        {
          value: 'swim',
          label: '수영',
          content: (
            <>
              <Contianer>
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
              </Contianer>
            </>
          ),
        },
        {
          value: 'basketball',
          label: '농구',
          content: (
            <>
              <Contianer>
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
              </Contianer>
            </>
          ),
        },
      ]}
    />
  );
};

export default FeedHome;

const Contianer = styled.div`
  height: calc(100vh - 14.5rem);
  overflow-y: scroll;
`;
