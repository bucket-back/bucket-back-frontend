import {
  CommonIcon,
  CommonText,
  Profile,
  DateText,
  CommonImage,
  CommonMenu,
  CommonButton,
} from '@/shared/components';
import { useUserInfo } from '@/shared/hooks';
import { FeedItemInfo, MemberInfo } from '@/shared/types';
import { useFeedLike, useFeedUnLike } from '../../hooks';
import {
  Container,
  ProfileWrapper,
  ContentsWrapper,
  ImageBox,
  DetailInfoWrapper,
  InteractPanel,
  LikeBox,
  LikeNumber,
  CommentBox,
  CommentNumber,
  BucketInfoBox,
} from './style';

interface FeedItemProps {
  memberInfo: MemberInfo;
  feedId: number;
  feedContent: string;
  isLike: boolean;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  feedItems: FeedItemInfo[];
  bucketName?: string;
  bucketBudget?: number;
  isDetail: boolean;
  onClick: (id: number) => void;
  onUpdate?: (id: number) => void;
  onDelete?: () => void;
}

const FeedItem = ({
  memberInfo,
  feedId,
  feedContent,
  isLike,
  likeCount,
  commentCount,
  createdAt,
  feedItems,
  bucketName,
  bucketBudget,
  isDetail = false,
  onClick,
  onUpdate,
  onDelete,
}: FeedItemProps) => {
  const userInfo = useUserInfo();

  const feedLike = useFeedLike();
  const feedUnLike = useFeedUnLike();

  const handleClickLike = () => {
    if (!isLike) {
      feedLike.mutate(feedId);
    } else {
      feedUnLike.mutate(feedId);
    }
  };

  return (
    <Container>
      <ProfileWrapper>
        <Profile
          nickname={memberInfo.nickName}
          src={memberInfo.profileImage}
          levelNumber={memberInfo.level}
          isAdopted={false}
        />
        {isDetail && userInfo?.nickname === memberInfo.nickName && (
          <CommonMenu
            type="update"
            iconSize="0.35rem"
            onUpdate={() => onUpdate && onUpdate(feedId)}
            onDelete={() => onDelete && onDelete()}
          />
        )}
      </ProfileWrapper>
      <ContentsWrapper>
        {feedContent && (
          <CommonText type="normalInfo" color="inherit" noOfLines={isDetail ? 10 : 3}>
            {feedContent}
          </CommonText>
        )}
        {isDetail && (
          <BucketInfoBox>
            <CommonText type="normalInfo">{bucketName}</CommonText>
            <CommonText type="normalInfo">{bucketBudget}원</CommonText>
          </BucketInfoBox>
        )}
        <ImageBox onClick={() => onClick(feedId)}>
          {feedItems.map((item) => (
            <CommonImage key={item.id} size="sm" src={item.image} />
          ))}
        </ImageBox>
        <DetailInfoWrapper>
          <DateText createdDate={createdAt} />
          <InteractPanel>
            {isDetail ? (
              <CommonButton type="sm" isLike={isLike} onClick={handleClickLike}>
                {String(likeCount)}
              </CommonButton>
            ) : (
              <>
                <LikeBox>
                  <CommonIcon type={isLike ? 'fillHeart' : 'heart'} />
                  <LikeNumber>{likeCount}</LikeNumber>
                </LikeBox>
                <CommentBox>
                  <CommonIcon type="comment" />
                  <CommentNumber>{commentCount}</CommentNumber>
                </CommentBox>
              </>
            )}
          </InteractPanel>
        </DetailInfoWrapper>
      </ContentsWrapper>
    </Container>
  );
};

export default FeedItem;
