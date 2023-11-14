import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
  Header,
} from '@/shared/components';
import { useAuthCheck } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  Container,
  ItemWrapper,
  ItemBox,
  ButtonWrapper,
  CommentNumberWrapper,
  CommentsContainer,
  Box,
} from './style';
import { ReadDetailItemRes, ReadReviewListRes } from '@/core/mocks/handler/item';
import ItemComment from '@/features/item/components/ItemComment/index';

const ItemDetail = () => {
  // 로그인 시 리뷰 클릭이 가능하도록 하기
  // 본인이 작성한 게시글은 리뷰를 작성하도록 할까?
  const isLogin = useAuthCheck();
  const [itemInfo, setItemInfo] = useState<ReadDetailItemRes>();
  const [reviewInfo, setReviewInfo] = useState<ReadReviewListRes>();

  const handleItem = () => {
    // TODO: 로그인 한 사용자가 아이템을 담을수 있는 기능
  };

  const handleBuy = () => {
    // TODO: api를 통해 받은 링크를 이동할수 있는 기능
  };

  useEffect(() => {
    axios.get('/api/items/1').then((res) => setItemInfo(res.data));
    axios.get('/api/items/1/reviews').then((res) => setReviewInfo(res.data));
  }, []);

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonImage size="md" />
        <ItemWrapper>
          <CommonText type="normalTitle" noOfLines={0}>
            {itemInfo?.itemInfo.name}
          </CommonText>
          <ItemBox>
            <CommonIcon type="fillStar" color="blue.300" />
            <Box>
              <CommonText type="smallInfo" noOfLines={0}>
                {itemInfo?.itemAvgRate} / 5
              </CommonText>
            </Box>
          </ItemBox>
        </ItemWrapper>
        <CommonText type="normalInfo">{formatNumber(Number(itemInfo?.itemInfo.price))}</CommonText>
        <ButtonWrapper>
          <CommonButton type="mdSmall" onClick={handleItem}>
            아이템 담기
          </CommonButton>
          <CommonButton type="mdBase" onClick={handleBuy}>
            구매하러 가기
          </CommonButton>
        </ButtonWrapper>
        {isLogin && <CommonButton type="mdFull">리뷰 쓰기</CommonButton>}
      </Container>
      <div>
        <CommonDivider size="lg" />
        <CommentNumberWrapper>
          <CommonText type="normalInfo">총 {reviewInfo?.reviewCount}개의 댓글</CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        {reviewInfo?.reviews.map(({ content, createdAt, memberInfo, rate, reviewId }) => (
          <>
            <ItemComment
              key={reviewId}
              content={content}
              createAt={createdAt}
              memberInfo={memberInfo}
              rate={rate}
              reviewId={reviewId}
            />
            <CommonDivider size="sm" />
          </>
        ))}
      </CommentsContainer>
    </>
  );
};

export default ItemDetail;