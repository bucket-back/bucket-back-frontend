import { useNavigate } from 'react-router-dom';
import { CommonButton, CommonMenu, CommonText, DateText, Profile } from '@/shared/components';
import { Review } from '@/shared/types';
import { Container, ProfileWrapper, ContentsWrapper, InteractPanel } from './style';
import { useDeleteReview } from '@/features/review/hooks';

export interface ItemCommentProps {
  content: Review['content'];
  createAt: Review['createdAt'];
  memberInfo: Review['memberInfo'];
  reviewId: Review['reviewId'];
  editPath: string;
  itemId: string;
  isReviewed: boolean;
}

const ItemComment = ({
  content,
  createAt,
  memberInfo,
  itemId,
  reviewId,
  editPath,
  isReviewed,
}: ItemCommentProps) => {
  const navigate = useNavigate();

  const { mutate: reviewDeleteMutate } = useDeleteReview(itemId);

  const handleDeleteClick = () => {
    reviewDeleteMutate({ itemId: Number(itemId), reviewId });
  };

  return (
    <Container>
      <ProfileWrapper>
        <Profile
          nickname={memberInfo.nickName}
          levelNumber={memberInfo.level}
          src={memberInfo.profileImage}
        />
        {isReviewed && (
          <CommonMenu
            type="update"
            iconSize="0.25rem"
            onUpdate={() => navigate(editPath)}
            onDelete={handleDeleteClick}
          />
        )}
      </ProfileWrapper>
      <ContentsWrapper>
        <CommonText type="smallInfo">{content}</CommonText>
      </ContentsWrapper>
      <ContentsWrapper>
        <DateText createdDate={createAt} />
        <InteractPanel>
          <CommonButton
            type="xsText"
            onClick={() =>
              navigate(`/member/${memberInfo.nickName}/inventory/${memberInfo.memberId}`)
            }
          >
            인벤토리
          </CommonButton>
        </InteractPanel>
      </ContentsWrapper>
    </Container>
  );
};

export default ItemComment;
