import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import {
  CommonButton,
  CommonDivider,
  CommonDrawer,
  CommonInput,
  CommonText,
  Header,
} from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import {
  FeedDetailContainer,
  CommentNumberWrapper,
  CommentsContainer,
  CommentInputContainer,
  NoResult,
} from './style';
import useComments from '@/features/comment/hooks/useComments';
import { FeedBucketDetail, FeedComment, FeedItem } from '@/features/feed/components';
import { useFeedDetail } from '@/features/feed/hooks';

const FeedDetail = () => {
  const { isOpen, onOpen, onClose } = useDrawer();
  const { feedId } = useParams();

  const feed = useFeedDetail(Number(feedId));
  const comment = useComments({ feedId: Number(feedId) || 1, size: 10 });

  return (
    <>
      <Header type="back" />
      <FeedDetailContainer>
        {feed.isSuccess && (
          <FeedItem
            memberInfo={feed.data.memberInfo}
            feedId={feed.data.feedInfo.id}
            feedContent={feed.data.feedInfo.content}
            isLike={feed.data.feedInfo.isLiked}
            likeCount={feed.data.feedInfo.likeCount}
            commentCount={3}
            createdAt={feed.data.feedInfo.createdAt}
            feedItems={feed.data.feedItems}
            bucketName={feed.data.feedInfo.bucketName}
            bucketBudget={feed.data.feedInfo.bucketBudget}
            isDetail
            onClick={onOpen}
          />
        )}
      </FeedDetailContainer>
      <div>
        <CommonDivider size="lg" />
        <CommentNumberWrapper>
          <CommonText type="normalInfo">
            총 {comment.data?.commentCursorSummary.summaryCount || 0}개의 댓글
          </CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        {comment.isSuccess && comment.data.commentCursorSummary.summaryCount > 0 ? (
          comment.data.commentCursorSummary.summaries.map((data) => (
            <Fragment key={data.commentId}>
              <FeedComment
                memberInfo={data.memberInfo}
                content={data.content}
                createdAt={data.createdAt}
                isAdopted={data.isAdopted}
              />
              <CommonDivider size="sm" />
            </Fragment>
          ))
        ) : (
          <NoResult>댓글이 없습니다.</NoResult>
        )}
      </CommentsContainer>
      <CommentInputContainer>
        <CommonInput
          size="md"
          type="text"
          width="100%"
          placeholder="댓글을 입력해주세요"
          rightIcon={<CommonButton type="mdFull">등록</CommonButton>}
        />
      </CommentInputContainer>

      <CommonDrawer isOpen={isOpen} onClose={onClose} onClickFooterButton={onClose} isFull={true}>
        <FeedBucketDetail />
      </CommonDrawer>
    </>
  );
};

export default FeedDetail;
