import {
  CommonIcon,
  CommonText,
  CommonTag,
  Profile,
  DateText,
  CommonImage,
} from '@/shared/components';
import {
  Container,
  ProfileWrapper,
  ContentsWrapper,
  ImageBox,
  BucketTitleTag,
  DetailInfoWrapper,
  InteractPanel,
  LikeBox,
  LikeNumber,
  CommentBox,
  CommentNumber,
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
  onClick: (id: number) => void;
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
  onClick,
}: FeedItemProps) => {
  return (
    <Container>
      <ProfileWrapper>
        <Profile
          nickName={memberInfo.nickname}
          src={memberInfo.profileImage}
          levelNumber={memberInfo.level}
          isAdopted={false}
        />
      </ProfileWrapper>
      <ContentsWrapper onClick={() => onClick(feedId)}>
        <CommonText type="smallInfo" color="inherit" noOfLines={3}>
          {feedContent}
        </CommonText>
        <ImageBox>
          {feedItems.map((item) => (
            <CommonImage key={item.itemId} size="sm" src={item.itemImage} />
          ))}
          <BucketTitleTag>
            <CommonTag type="feed">
              <CommonText type="smallInfo">하얀 개구리 조합</CommonText>
            </CommonTag>
          </BucketTitleTag>
        </ImageBox>
        <DetailInfoWrapper>
          <DateText createdDate={createAt} />
          <InteractPanel>
            <LikeBox>
              <CommonIcon type={isLike ? 'fillHeart' : 'heart'} />
              <LikeNumber>{likeCount}</LikeNumber>
            </LikeBox>
            <CommentBox>
              <CommonIcon type="comment" />
              <CommentNumber>{commentCount}</CommentNumber>
            </CommentBox>
          </InteractPanel>
        </DetailInfoWrapper>
      </ContentsWrapper>
    </Container>
  );
};

export default FeedItem;
