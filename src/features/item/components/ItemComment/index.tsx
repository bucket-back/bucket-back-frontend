import { useNavigate } from 'react-router-dom';
import {
  CommonButton,
  CommonIcon,
  CommonMenu,
  CommonText,
  DateText,
  Profile,
} from '@/shared/components';
import { Review } from '@/shared/types';
import { Container, ProfileWrapper, ContentsWrapper, InteractPanel } from './style';
import { useDeleteReview } from '@/features/review/hooks';

export interface ItemCommentProps {
  content: Review['content'];
  createAt: Review['createdAt'];
  memberInfo: Review['memberInfo'];
  rate: Review['rate'];
  reviewId: Review['reviewId'];
  editPath: string;
  itemId: string;
}

const ItemComment = ({
  content,
  createAt,
  memberInfo,
  itemId,
  reviewId,
  rate,
  editPath,
}: ItemCommentProps) => {
  const navigate = useNavigate();
  const { mutate: reviewDeleteMutate } = useDeleteReview(itemId);

  const handleDeleteClick = () => {
    reviewDeleteMutate({ itemId: Number(itemId), reviewId });
  };

  return (
    <Container>
      <ProfileWrapper>
        <Profile nickname={memberInfo.nickName} levelNumber={2} src={memberInfo.profileImage} />
        <CommonMenu
          type="update"
          iconSize="0.25rem"
          onUpdate={() => navigate(editPath)}
          onDelete={handleDeleteClick}
        />
      </ProfileWrapper>
      <ContentsWrapper>
        <CommonText type="smallInfo">{content}</CommonText>
      </ContentsWrapper>
      <ContentsWrapper>
        <DateText createdDate={createAt} />
        <InteractPanel>
          <CommonIcon type="heart" size="0.75rem" />
          <CommonText type="smallInfo">{rate}</CommonText>
          <CommonButton type="xsText">좋아요</CommonButton>
          <CommonButton type="xsText">인벤토리</CommonButton>
          <CommonButton type="xsText">채택하기</CommonButton>
        </InteractPanel>
      </ContentsWrapper>
    </Container>
  );
};

export default ItemComment;
