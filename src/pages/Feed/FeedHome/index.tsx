import { Fragment } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CommonDivider, CommonSelect, CommonTabs } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { Container, NoResult, SelectWrapper } from './style';
import { FeedItem } from '@/features/feed/components';
import { feedQueryOption } from '@/features/feed/service';
import { hobbyQueryOption } from '@/features/hobby/service';

const FeedHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hobbies = useQuery({ ...hobbyQueryOption.all(), select: ({ hobbies }) => hobbies });

  if (hobbies.isPending) {
    return;
  }

  if (hobbies.isError) {
    return;
  }

  const currentTabIndex = hobbies.data
    .map(({ name }) => name)
    .indexOf(searchParams.get('hobby') || hobbies.data[0].name);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        setSearchParams({ hobby: value });
      }}
      tabsData={hobbies.data.map(({ name, value }) => ({
        value: name,
        label: value,
        content: (
          <Container>
            <SelectWrapper>
              <CommonSelect
                selectedValue={searchParams.get('sort') || 'recent'}
                onChange={(e) => {
                  const sort = e.target.value;

                  setSearchParams({
                    hobby: searchParams.get('hobby') || '',
                    sort: sort.toUpperCase(),
                  });
                }}
              />
            </SelectWrapper>
            <HobbyFeedList
              hobbyName={searchParams.get('hobby') || hobbies.data[0].name}
              sortCondition={searchParams.get('sort') || 'recent'}
            />
          </Container>
        ),
      }))}
    />
  );
};

export default FeedHome;

interface FeedListProps {
  hobbyName: string;
  sortCondition: string;
}

const HobbyFeedList = ({ hobbyName, sortCondition }: FeedListProps) => {
  const navigate = useNavigate();
  const feeds = useInfiniteQuery(feedQueryOption.list({ hobbyName, sortCondition }));

  const observedRef = useIntersectionObserver({ onObserve: feeds.fetchNextPage });

  if (feeds.isPending) {
    return;
  }

  if (feeds.isError) {
    return;
  }

  if (feeds.data.pages[0].feeds.length === 0) {
    return <NoResult>피드가 존재하지 않습니다.</NoResult>;
  }

  return (
    <>
      {feeds.data.pages.map((page) =>
        page.feeds.map(
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
      )}
      {feeds.hasNextPage ? <div ref={observedRef} /> : <>더이상 피드가 존재하지 않습니다.</>}
    </>
  );
};
