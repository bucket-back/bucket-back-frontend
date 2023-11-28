import { Fragment } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDivider, CommonTabs } from '@/shared/components';
import { FeedItem } from '..';
import { feedQueryOption } from '../../service';
import { Container, NoResult } from './style';
import { hobbyQueryOption } from '@/features/hobby/service';

const HOBBY = 'hobby';

interface FeedListProps {
  isLikedFeedTab: boolean;
}

const FeedList = ({ isLikedFeedTab }: FeedListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { nickname } = useParams();
  const navigate = useNavigate();
  const hobby = useQuery({ ...hobbyQueryOption.all(), select: (data) => data.hobbies });

  const feeds = useQuery(
    feedQueryOption.list({
      hobbyName: searchParams.get(HOBBY) || hobby.data?.[0].name || '',
      nickname,
      myPageOwnerLikeFeeds: isLikedFeedTab,
    })
  );

  const currentTabIndex = hobby.data
    ?.map(({ name }) => name)
    .indexOf(searchParams.get(HOBBY) || hobby.data[0].name);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        if (searchParams.has(HOBBY)) {
          searchParams.set(HOBBY, value);
        } else {
          searchParams.append(HOBBY, value);
        }
        setSearchParams(searchParams);
      }}
      tabsData={
        hobby.data?.map(({ name, value }) => ({
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
                        onClick={() => navigate(`/feed/${feedId}`)}
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

export default FeedList;
