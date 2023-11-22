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
import { useAuthCheck, useDrawer, useUserInfo } from '@/shared/hooks';
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
import { feedQueryOption } from '@/features/feed/service';

const FeedDetail = () => {
  const { isOpen, onOpen, onClose } = useDrawer();
  const { feedId } = useParams();
  const feedIdNumber = Number(feedId);
  const isLogin = useAuthCheck();
  const userInfo = useUserInfo();

  const feedDetail = useQuery(feedQueryOption.detail(feedIdNumber));
  const comment = useQuery(commentQueryQption.list({ feedId: feedIdNumber || 1, size: 10 }));
  const { register, handleSubmit, reset } = useForm<PostCommentRequest>();
  const { mutate } = useAddComment();
  const onSubmit: SubmitHandler<PostCommentRequest> = (data) => {
    mutate({ feedId: feedIdNumber, content: data.content });
    reset();
  };
  const isOwnFeed = feedDetail.data?.memberInfo.nickName === userInfo?.nickname;

  return (
    <>
      <Header type="back" />
      <FeedDetailContainer>
        {feedDetail.isSuccess && (
          <FeedItem
            memberInfo={feedDetail.data.memberInfo}
            feedId={feedDetail.data.feedInfo.id}
            feedContent={feedDetail.data.feedInfo.content}
            isLike={feedDetail.data.feedInfo.isLiked}
            likeCount={feedDetail.data.feedInfo.likeCount}
            commentCount={comment.data?.totalCount || 0}
            createdAt={feedDetail.data.feedInfo.createdAt}
            feedItems={feedDetail.data.feedItems}
            bucketName={feedDetail.data.feedInfo.bucketName}
            bucketBudget={feedDetail.data.feedInfo.bucketBudget}
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
                feedId={feedIdNumber}
                commentId={data.commentId}
                memberInfo={data.memberInfo}
                content={data.content}
                createdAt={data.createdAt}
                isAdopted={data.isAdopted}
                isOwnFeed={isOwnFeed}
                hasAdoptedComment={Boolean(feedDetail.data?.feedInfo.hasAdoptedComment)}
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
          placeholder={isLogin ? '댓글을 입력해주세요' : '로그인후 이용가능합니다'}
          isDisabled={!isLogin}
          rightIcon={
            <CommonButton type="mdFull" isSubmit isDisabled={!isLogin}>
              등록
            </CommonButton>
          }
          {...register('content', { required: true, minLength: 1 })}
        />
      </CommentInputContainer>

      <CommonDrawer isOpen={isOpen} onClose={onClose} onClickFooterButton={onClose} isFull={true}>
        <FeedItemsDetail items={feedDetail.data?.feedItems} />
      </CommonDrawer>
    </>
  );
};

export default FeedDetail;
