import { useDisclosure } from '@chakra-ui/react';
import {
  CommonButton,
  CommonDivider,
  CommonDrawer,
  CommonInput,
  CommonText,
  Header,
} from '@/shared/components';
import {
  FeedDetailContainer,
  CommentNumberWrapper,
  CommentsContainer,
  CommentInputContainer,
} from './style';
import { FeedBucketDetail, FeedComment, FeedItem } from '@/features/feed/components';

const FeedDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
