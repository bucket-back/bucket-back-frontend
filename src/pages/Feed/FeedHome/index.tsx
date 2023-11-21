import { useEffect, Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CommonDivider, CommonTabs } from '@/shared/components';
import { Container, NoResult } from './style';
import { FeedItem } from '@/features/feed/components';
import { useFeeds } from '@/features/feed/hooks';
import { useHobby } from '@/features/hobby/hooks';

const FeedHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const hobbies = useHobby();

  useEffect(() => {
    if (!searchParams.get('hobby') && hobbies.isSuccess) {
      setSearchParams({ hobby: hobbies.data.hobbies[0].name });
    }
  }, [hobbies.data?.hobbies, hobbies.isSuccess, searchParams, setSearchParams]);

  const feeds = useFeeds({
    hobbyName: searchParams.get('hobby') || hobbies.data?.hobbies[0].name || '',
    size: 10,
  });

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
              {feeds.isSuccess && feeds.data.feeds.length > 0 ? (
                feeds.data.feeds.map(
                  ({
                    feedId,
                    memberInfo,
                    content,
                    isLike,
                    likeCount,
                    commentCount,
                    createdAt,
                    feedItems,
                  }) => (
                    <Fragment key={feedId}>
                      <FeedItem
                        memberInfo={memberInfo}
                        feedId={feedId}
                        feedContent={content}
                        isLike={isLike}
                        likeCount={likeCount}
                        commentCount={commentCount}
                        createdAt={createdAt}
                        feedItems={feedItems}
                        isDetail={false}
                        onClick={() => navigate(`./${feedId}`)}
                      />
                      <CommonDivider size="sm" />
                    </Fragment>
                  )
                )
              ) : (
                <NoResult>피드가 존재하지 않습니다.</NoResult>
              )}
            </Container>
          ),
        })) || []
      }
    />
  );
};

export default FeedHome;
