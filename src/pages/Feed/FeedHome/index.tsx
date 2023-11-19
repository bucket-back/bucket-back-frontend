// import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CommonDivider, CommonTabs } from '@/shared/components';
import { Container } from './style';
import { FeedItem } from '@/features/feed/components';
import { useFeeds } from '@/features/feed/hooks';
import { useHobby } from '@/features/hobby/hooks';

// const hobbyDefault = [
//   {
//     name: 'basketball',
//     value: '농구',
//   },
//   {
//     name: 'baseball',
//     value: '야구',
//   },
//   {
//     name: 'soccer',
//     value: '축구',
//   },
//   {
//     name: 'cycle',
//     value: '사이클',
//   },
//   {
//     name: 'keyboard',
//     value: '키보드',
//   },
//   {
//     name: 'swimming',
//     value: '수영',
//   },
// ];

const FeedHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [nextCursorId, setNextCursorId] = useState<string | undefined>(undefined);
  const hobbies = useHobby();

  if (!searchParams.get('hobby') && hobbies.status === 'success') {
    setSearchParams({ hobby: hobbies.data?.hobbies[0].name });
  }

  const feeds = useFeeds({
    hobbyName: searchParams.get('hobby')?.toUpperCase() || 'BASEBALL',
    size: 10,
  });

  // useEffect(() => {
  //   if (feeds.data?.nextCursorId) {
  //     setNextCursorId(feeds.data?.nextCursorId);
  //   }
  // }, [feeds.data?.nextCursorId]);

  const currentTabIndex = hobbies.data?.hobbies
    .map(({ name }) => name)
    .indexOf(searchParams.get('hobby') || hobbies.data.hobbies[0].name);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        setSearchParams({ hobby: value });
      }}
      tabsData={
        hobbies.data?.hobbies.map(({ name, value }) => ({
          value: name,
          label: value,
          content: (
            <Container>
              {feeds.data?.feeds.map((feed) => (
                <Fragment key={feed.feedId}>
                  <FeedItem onClick={() => {}} />
                  <CommonDivider size="sm" />
                </Fragment>
              ))}
            </Container>
          ),
        })) || []
      }
    />
  );
};

export default FeedHome;
