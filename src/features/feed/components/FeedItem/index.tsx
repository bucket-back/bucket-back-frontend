import {
  CommonIcon,
  CommonText,
  Profile,
  DateText,
  CommonImage,
  CommonMenu,
  CommonButton,
} from '@/shared/components';
import { FeedItemInfo, MemberInfo } from '@/shared/types';
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
  bucketName: string;
  bucketBudget: number;
  isDetail: boolean;
  onClick: (id: number) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const FeedItem = ({
  memberInfo = {
    nickName: '잘생긴 하얀 개굴',
    profileImage: 'https://via.placeholder.com/100x100',
    level: 1,
    memberId: 2,
  },
  feedId = 1,
  feedContent = '애들아 내 조합 어떰? ㅋㅋㅋㅋ',
  isLike = true,
  likeCount,
  commentCount = 3,
  createdAt = '2021-10-15T20:48:19.816Z',
  feedItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/100x100',
      name: '',
      price: 0,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100x100',
      name: '',
      price: 0,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100x100',
      name: '',
      price: 0,
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/100x100',
      name: '',
      price: 0,
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/100x100',
      name: '',
      price: 0,
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/100x100',
      name: '',
      price: 0,
    },
  ],
  bucketName,
  bucketBudget,
  isDetail = false,
  onClick,
  onUpdate,
  onDelete,
}: Partial<FeedItemProps>) => {
  return (
    <Container>
      <ProfileWrapper>
        <Profile
          id={memberInfo.memberId}
          nickName={memberInfo.nickName}
          src={memberInfo.profileImage}
          levelNumber={memberInfo.level}
          isAdopted={false}
        />
        {isDetail && (
          <CommonMenu
            type="update"
            iconSize="0.35rem"
            onUpdate={() => onUpdate && onUpdate(feedId)}
            onDelete={() => onDelete && onDelete(feedId)}
          />
        )}
      </ProfileWrapper>
      <ContentsWrapper onClick={() => onClick && onClick(feedId)}>
        <CommonText type="smallInfo" color="inherit" noOfLines={isDetail ? 10 : 3}>
          {feedContent}
        </CommonText>
        {isDetail && (
          <BucketInfoBox>
            <CommonText type="normalInfo">{bucketName}</CommonText>
            <CommonText type="normalInfo">{bucketBudget}원</CommonText>
          </BucketInfoBox>
        )}
        <ImageBox>
          {feedItems.map((item) => (
            <CommonImage key={item.id} size="sm" src={item.image} />
          ))}
        </ImageBox>
        <DetailInfoWrapper>
          <DateText createdDate={createdAt} />
          <InteractPanel>
            {isDetail ? (
              <CommonButton type="sm">{String(likeCount)}</CommonButton>
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
