import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonDivider } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { FeedItem } from '..';
import { feedQueryOption } from '../../service';
import { NoResult, ObservedBox } from './style';

interface FeedMemberListProps {
  hobbyName: string;
  nickname: string;
  onlyNicknameLikeFeeds: boolean;
}

const FeedMemberList = ({ hobbyName, nickname, onlyNicknameLikeFeeds }: FeedMemberListProps) => {
  const navigate = useNavigate();

  const feeds = useInfiniteQuery(
    feedQueryOption.list({ hobbyName, nickname, onlyNicknameLikeFeeds })
  );

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
      {feeds.hasNextPage && <ObservedBox ref={observedRef} />}
    </>
  );
};

export default FeedMemberList;
