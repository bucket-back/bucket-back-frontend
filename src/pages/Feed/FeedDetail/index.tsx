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
} from './style';
import { FeedBucketDetail, FeedComment, FeedItem } from '@/features/feed/components';
import { useFeedDetail } from '@/features/feed/hooks';

const FeedDetail = () => {
  const { isOpen, onOpen, onClose } = useDrawer();
  const { feedId } = useParams();

  const feed = useFeedDetail(Number(feedId));

  return (
    <>
      <Header type="back" />
      <FeedDetailContainer>
        <FeedItem
          memberInfo={feed.data?.memberInfo}
          feedId={feed.data?.feedInfo.id}
          feedContent={feed.data?.feedInfo.content}
          isLike={feed.data?.feedInfo.isLiked}
          likeCount={feed.data?.feedInfo.likeCount}
          commentCount={3}
          createdAt={feed.data?.feedInfo.createdAt}
          feedItems={feed.data?.feedItems}
          bucketName={feed.data?.feedInfo.bucketName}
          bucketBudget={feed.data?.feedInfo.bucketBudget}
          isDetail
          onClick={onOpen}
        />
      </FeedDetailContainer>
      <div>
        <CommonDivider size="lg" />
        <CommentNumberWrapper>
          <CommonText type="normalInfo">총 0개의 댓글</CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
        <FeedComment />
        <CommonDivider size="sm" />
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
