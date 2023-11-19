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
} from './style';
import { FeedBucketDetail, FeedComment, FeedItem } from '@/features/feed/components';
import { feedApi } from '@/features/feed/service';

const FeedDetail = () => {
  const { isOpen, onOpen, onClose } = useDrawer();
  const { feedId } = useParams();
  const { data } = useQuery({
    queryKey: ['feedDetail'],
    queryFn: () => feedApi.getFeedDetail(Number(feedId)),
  });

  console.log(data);

  return (
    <>
      <Header type="back" />
      <FeedDetailContainer>
        <FeedItem isDetail onClick={onOpen} />
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
