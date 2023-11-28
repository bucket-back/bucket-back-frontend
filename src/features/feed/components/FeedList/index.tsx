import { Fragment } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CommonDivider, CommonTabs } from '@/shared/components';
import { FeedItem } from '..';
import { feedQueryOption } from '../../service';
import { Container } from './style';
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

  const feeds = useInfiniteQuery(
    feedQueryOption.list({
      hobbyName: searchParams.get(HOBBY) || hobby.data?.[0].name || '',
      nickname,
      onlyNicknameLikeFeeds: isLikedFeedTab,
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
              {feeds.isSuccess &&
                feeds.data.pages.map((page) =>
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
                          onClick={() => navigate(`/feed/${feedId}`)}
                        />
                        <CommonDivider size="sm" />
                      </Fragment>
                    )
                  )
                )}
            </Container>
          ),
        })) || []
      }
    />
  );
};

export default FeedList;
