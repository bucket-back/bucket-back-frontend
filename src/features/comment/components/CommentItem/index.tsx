import { CommonButton, CommonMenu, CommonText, DateText, Profile } from '@/shared/components';
import { useUserInfo } from '@/shared/hooks';
import { MemberInfo } from '@/shared/types';
import { useDeleteComment } from '../../hooks';
import { Container, ProfileWrapper, ContentsWrapper, InteractPanel } from './style';

interface CommentItemProps {
  feedId: number;
  commentId: number;
  content: string;
  createdAt: string;
  isAdopted: boolean;
  memberInfo: MemberInfo;
  isOwnFeed: boolean;
  hasAdoptedComment: boolean;
}

const CommentItem = ({
  feedId,
  commentId,
  content,
  createdAt,
  isAdopted,
  memberInfo,
  isOwnFeed,
  hasAdoptedComment,
}: CommentItemProps) => {
  const userInfo = useUserInfo();
  const deletComment = useDeleteComment();

  return (
    <Container>
      <ProfileWrapper>
        <Profile
          src={memberInfo.profileImage}
          nickname={memberInfo.nickName}
          levelNumber={memberInfo.level}
          isAdopted={isAdopted}
        />
        {userInfo?.nickname === memberInfo.nickName && (
          <CommonMenu
            type="update"
            iconSize="0.25rem"
            onDelete={() => {
              deletComment.mutate({ feedId, commentId });
            }}
            onUpdate={() => {}}
          />
        )}
      </ProfileWrapper>
      <ContentsWrapper>
        <CommonText type="smallInfo">{content}</CommonText>
      </ContentsWrapper>
      <ContentsWrapper>
        <DateText createdDate={createdAt} />
        <InteractPanel>
          <CommonButton type="xsText">인벤토리</CommonButton>
          {isOwnFeed && !hasAdoptedComment && <CommonButton type="xsText">채택하기</CommonButton>}
        </InteractPanel>
      </ContentsWrapper>
    </Container>
  );
};

export default CommentItem;
