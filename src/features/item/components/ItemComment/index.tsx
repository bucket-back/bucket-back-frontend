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
import { Container, ProfileWrapper, ContentsWrapper, InteractPanel, RateBox } from './style';
import { useDeleteReview } from '@/features/review/hooks';

export interface ItemCommentProps {
  content: Review['content'];
  createAt: Review['createdAt'];
  memberInfo: Review['memberInfo'];
  reviewId: Review['reviewId'];
  editPath: string;
  itemId: string;
  rate: number;
  isReviewed: boolean;
}

const ItemComment = ({
  content,
  createAt,
  memberInfo,
  itemId,
  rate,
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
          imageSize="2.5rem"
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
            onClick={() => navigate(`/member/${memberInfo.nickName}/inventory`)}
          >
            인벤토리
          </CommonButton>
          <RateBox>
            <CommonIcon type="fillStar" color="blue.300" />
            <CommonText type="smallInfo" noOfLines={0}>
              {rate} / 5
            </CommonText>
          </RateBox>
        </InteractPanel>
      </ContentsWrapper>
    </Container>
  );
};

export default ItemComment;
