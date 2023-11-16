import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonButton, CommonDivider, CommonInput, CommonText, Header } from '@/shared/components';
import {
  FeedDetailContainer,
  CommentNumberWrapper,
  CommentsContainer,
  CommentInputContainer,
} from './style';
import { FeedComment, FeedItem } from '@/features/feed/components';
import { getFeedDetail } from '@/features/feed/service/handler';

const FeedDetail = () => {
  const { feedId } = useParams();
  const { data } = useQuery({
    queryKey: ['feedDetail'],
    queryFn: () => getFeedDetail(Number(feedId)),
  });

  console.log(data);

  return (
    <>
      <Header type="back" />
      <FeedDetailContainer>
        <FeedItem isDetail />
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
