import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { hobbyApi } from '@/features/hobby';
import { CommonDivider, CommonTabs } from '@/shared/components';
import { Container } from './style';
import { FeedItem } from '@/features/feed/components';
import { feedApi } from '@/features/feed/service';

const hobby = ['cycle', 'swim', 'basketball'];

const FeedHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabIndex = hobby.indexOf(searchParams.get('hobby') || hobby[0]);

  const { data } = useQuery({
    queryKey: ['feeds'],
    queryFn: () => feedApi.getFeeds({ hobbyName: 'BASEBALL', size: 10 }),
  });

  console.log(data);

  const { data: hobbies } = useQuery({
    queryKey: ['hobbies'],
    queryFn: () => hobbyApi.getHobbies(),
  });

  console.log(hobbies);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        setSearchParams({ hobby: value });
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
