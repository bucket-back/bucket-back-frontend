import styled from '@emotion/styled';
import { CommonButton, CommonDivider, CommonInput, CommonText, Header } from '@/shared/components';
import { FeedComment, FeedItem } from '@/features/feed/components';

const FeedDetail = () => {
  return (
    <>
      <Header type="back" />

      <FeedDetailContainer>
        <FeedDetailWrapper>
          <FeedItem isDetail />
        </FeedDetailWrapper>
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
    </>
  );
};

export default FeedDetail;

const FeedDetailContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const FeedDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const CommentsContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const CommentNumberWrapper = styled.div`
  padding: 1rem 1.75rem;
`;

const CommentInputContainer = styled.div`
  padding: 0 0.5rem 0.5rem 0.5rem;
`;
