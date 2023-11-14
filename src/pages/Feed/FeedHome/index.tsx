import { useSearchParams } from 'react-router-dom';
import { CommonDivider, CommonTabs } from '@/shared/components';
import { Container } from './style';
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
              <Container>
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
              </Container>
            </>
          ),
        },
        {
          value: 'swim',
          label: '수영',
          content: (
            <>
              <Container>
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
              </Container>
            </>
          ),
        },
        {
          value: 'basketball',
          label: '농구',
          content: (
            <>
              <Container>
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
                <FeedItem />
                <CommonDivider size="sm" />
              </Container>
            </>
          ),
        },
      ]}
    />
  );
};

export default FeedHome;
