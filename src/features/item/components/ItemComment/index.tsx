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

export interface ItemCommentProps {
  content: Review['content'];
  createAt: Review['createdAt'];
  memberInfo: Review['memberInfo'];
  rate: Review['rate'];
  reviewId: Review['reviewId'];
}

const ItemComment = ({ content, createAt, memberInfo, rate }: ItemCommentProps) => {
  return (
    <Container>
      <ProfileWrapper>
        <Profile nickname={memberInfo.nickName} levelNumber={2} src={memberInfo.profileImage} />
        <CommonMenu type="update" iconSize="0.25rem" onDelete={() => {}} onUpdate={() => {}} />
      </ProfileWrapper>
      <ContentsWrapper>
        <CommonText type="smallInfo">{content}</CommonText>
      </ContentsWrapper>
      <ContentsWrapper>
        <DateText createdDate={createAt} />
        <InteractPanel>
          {/* 본인이 클릭했다면 채워주기 */}
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
