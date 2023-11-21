import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { CommentItem } from '@/features/comment/components';
import useAddComment from '@/features/comment/hooks/useAddComment';
import { PostCommentRequest, commentQueryQption } from '@/features/comment/service';
import { FeedItemsDetail, FeedItem } from '@/features/feed/components';
import { useFeedDetail } from '@/features/feed/hooks';

const FeedDetail = () => {
  const { isOpen, onOpen, onClose } = useDrawer();
  const { feedId } = useParams();

  const feed = useFeedDetail(Number(feedId));
  const comment = useQuery(commentQueryQption.list({ feedId: Number(feedId) || 1, size: 10 }));

  const { register, handleSubmit, reset } = useForm<PostCommentRequest>();
  const { mutate } = useAddComment();
  const onSubmit: SubmitHandler<PostCommentRequest> = (data) => {
    mutate({ feedId: Number(feedId), content: data.content });
    reset();
  };

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
            commentCount={comment.data?.totalCount || 0}
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
          <CommonText type="normalInfo">총 {comment.data?.totalCount || 0}개의 댓글</CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        {comment.isSuccess && comment.data.totalCount > 0 ? (
          comment.data.comments.map((data) => (
            <Fragment key={data.commentId}>
              <CommentItem
                feedId={Number(feedId)}
                commentId={data.commentId}
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
      <CommentInputContainer onSubmit={handleSubmit(onSubmit)}>
        <CommonInput
          size="md"
          type="text"
          width="100%"
          placeholder="댓글을 입력해주세요"
          rightIcon={
            <CommonButton isSubmit type="mdFull">
              등록
            </CommonButton>
          }
          {...register('content', { required: true, minLength: 1 })}
        />
      </CommentInputContainer>

      <CommonDrawer isOpen={isOpen} onClose={onClose} onClickFooterButton={onClose} isFull={true}>
        <FeedItemsDetail items={feed.data?.feedItems} />
      </CommonDrawer>
    </>
  );
};

export default FeedDetail;
