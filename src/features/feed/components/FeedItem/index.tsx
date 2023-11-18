import {
  CommonIcon,
  CommonText,
  Profile,
  DateText,
  CommonImage,
  CommonMenu,
  CommonButton,
} from '@/shared/components';
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

interface Member {
  nickname: string;
  profileImage: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  memberId: number;
}

interface Item {
  itemId: number;
  itemImage: string;
  itemUrl: string;
}

interface FeedItemProps {
  memberInfo: Member;
  feedId: number;
  feedContent: string;
  isLike: boolean;
  likeCount: number;
  commentCount: number;
  createAt: string;
  feedItems: Item[];
  isDetail: boolean;
  onClick: (id: number) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const FeedItem = ({
  memberInfo = {
    nickname: '잘생긴 하얀 개굴',
    profileImage: 'https://via.placeholder.com/100x100',
    level: 1,
    memberId: 2,
  },
  feedId = 1,
  feedContent = '애들아 내 조합 어떰? ㅋㅋㅋㅋ',
  isLike = true,
  likeCount = 3,
  commentCount = 3,
  createAt = '2021-10-15T20:48:19.816Z',
  feedItems = [
    {
      itemId: 1,
      itemImage: 'https://via.placeholder.com/100x100',
      itemUrl: 'https://www.naver.com/',
    },
    {
      itemId: 2,
      itemImage: 'https://via.placeholder.com/100x100',
      itemUrl: 'https://www.naver.com/',
    },
    {
      itemId: 3,
      itemImage: 'https://via.placeholder.com/100x100',
      itemUrl: 'https://www.naver.com/',
    },
    {
      itemId: 4,
      itemImage: 'https://via.placeholder.com/100x100',
      itemUrl: 'https://www.naver.com/',
    },
    {
      itemId: 5,
      itemImage: 'https://via.placeholder.com/100x100',
      itemUrl: 'https://www.naver.com/',
    },
    {
      itemId: 6,
      itemImage: 'https://via.placeholder.com/100x100',
      itemUrl: 'https://www.naver.com/',
    },
  ],
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
          nickName={memberInfo.nickname}
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
            <CommonText type="normalInfo">하얀 개구리 조합</CommonText>
            <CommonText type="normalInfo">29,000원</CommonText>
          </BucketInfoBox>
        )}
        <ImageBox>
          {feedItems.map((item) => (
            <CommonImage key={item.itemId} size="sm" src={item.itemImage} />
          ))}
        </ImageBox>
        <DetailInfoWrapper>
          <DateText createdDate={createAt} />
          <InteractPanel>
            {isDetail ? (
              <CommonButton type="sm">3</CommonButton>
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
