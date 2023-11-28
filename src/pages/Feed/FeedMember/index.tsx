import { useParams, useSearchParams } from 'react-router-dom';
import { CommonTabs, CommonText, Header } from '@/shared/components';
import { Container, Title } from './style';
import { FeedList } from '@/features/feed/components';

const TABS = {
  MY_FEED: {
    INDEX: 0,
    VALUE: 'myFeed',
    LABEL: '올린 피드',
  },
  LIKED_FEED: {
    INDEX: 1,
    VALUE: 'likedFeed',
    LABEL: '좋아요한 피드',
  },
} as const;

const FeedMember = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLikedFeedTab = searchParams.get('tab') === TABS.LIKED_FEED.VALUE;
  const { nickname } = useParams();

  return (
    <>
      <Header type="back" path={`/member/${nickname}`} />
      <Title>
        <CommonText type="normalTitle">피드</CommonText>
      </Title>
      <Container>
        <CommonTabs
          currentTabIndex={isLikedFeedTab ? TABS.LIKED_FEED.INDEX : TABS.MY_FEED.INDEX}
          tabsType="line"
          isFitted
          onClick={(value) => {
            setSearchParams({ tab: value });
          }}
          tabsData={[
            {
              label: TABS.MY_FEED.LABEL,
              value: TABS.MY_FEED.VALUE,
              content: <FeedList isLikedFeedTab={isLikedFeedTab} />,
            },
            {
              label: TABS.LIKED_FEED.LABEL,
              value: TABS.LIKED_FEED.VALUE,
              content: <FeedList isLikedFeedTab={isLikedFeedTab} />,
            },
          ]}
        />
      </Container>
    </>
  );
};

export default FeedMember;
