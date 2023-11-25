import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useDeleteComment, useUpdateComment } from '@/features/comment/hooks';
import useAddComment from '@/features/comment/hooks/useAddComment';
import { commentQueryQption } from '@/features/comment/service';
import { FeedItemsDetail, FeedItem } from '@/features/feed/components';
import { useDeleteFeed } from '@/features/feed/hooks';
import { feedQueryOption } from '@/features/feed/service';

interface CommentContent {
  content: string;
}

const FeedDetail = () => {
  const { isOpen, onOpen, onClose } = useDrawer();
  const [deleteStatus, setDeleteStatus] = useState<'feed' | 'comment'>('feed');
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDrawer();
  const { feedId } = useParams();
  const feedIdNumber = Number(feedId);
  const isLogin = useAuthCheck();
  const userInfo = useUserInfo();
  const deleteFeed = useDeleteFeed();
  const navigate = useNavigate();

  const feedDetail = useQuery(feedQueryOption.detail(feedIdNumber));
  const comment = useQuery(commentQueryQption.list({ feedId: feedIdNumber || 1, size: 10 }));
  const { register, handleSubmit, reset } = useForm<CommentContent>();
  const addComment = useAddComment();
  const onCreateComment: SubmitHandler<CommentContent> = (data) => {
    addComment.mutate({ feedId: feedIdNumber, content: data.content });
    reset();
  };
  const isOwnFeed = feedDetail.data?.memberInfo.nickName === userInfo?.nickname;

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingCommentId, setUpdatingCommentId] = useState(0);
  const [selectedCommentId, setSelectedCommentId] = useState(0);
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const onUpdateComment: SubmitHandler<CommentContent> = (data) => {
    updateComment.mutate({
      feedId: feedIdNumber,
      commentId: updatingCommentId,
      content: data.content,
    });
    reset();
  };

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
            totalPrice={feedDetail.data.feedInfo.totalPrice}
            isDetail
            onClick={onOpen}
            onDelete={() => {
              setDeleteStatus('feed');
              onDeleteOpen();
            }}
            onUpdate={() => navigate(`./edit`)}
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
                onDelete={() => {
                  setSelectedCommentId(data.commentId);
                  setDeleteStatus('comment');
                  onDeleteOpen();
                }}
                onUpdate={() => {
                  setIsUpdating(true);
                  setUpdatingCommentId(data.commentId);
                }}
              />
              <CommonDivider size="sm" />
            </Fragment>
          ))
        ) : (
          <NoResult>댓글이 없습니다.</NoResult>
        )}
      </CommentsContainer>
      {isUpdating ? (
        <CommentInputContainer onSubmit={handleSubmit(onUpdateComment)}>
          <CommonInput
            size="md"
            type="text"
            width="100%"
            placeholder="댓글을 수정해주세요"
            rightIcon={
              <CommonButton type="mdFull" isSubmit isDisabled={!isLogin}>
                수정
              </CommonButton>
            }
            {...register('content', { required: true, minLength: 1 })}
          />
        </CommentInputContainer>
      ) : (
        <CommentInputContainer onSubmit={handleSubmit(onCreateComment)}>
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
      )}

      <CommonDrawer isOpen={isOpen} onClose={onClose} onClickFooterButton={onClose} isFull={true}>
        <FeedItemsDetail items={feedDetail.data?.feedItems} />
      </CommonDrawer>
      <CommonDrawer
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onClickFooterButton={() => {
          if (deleteStatus === 'feed') {
            deleteFeed.mutate(feedIdNumber);
          }

          if (deleteStatus === 'comment') {
            deleteComment.mutate({ feedId: feedIdNumber, commentId: selectedCommentId });
            onDeleteClose();
          }
        }}
        isFull={false}
        isCloseButton={false}
      >
        정말로 {deleteStatus === 'feed' ? '피드를' : '댓글을'} 삭제하시겠습니까?
      </CommonDrawer>
    </>
  );
};

export default FeedDetail;
