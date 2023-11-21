import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import ItemComment from '@/features/item/components/ItemComment/index';
import itemQueryOption from '@/features/item/service/queryOption';
import { GetSearchReviewListResponse } from '@/features/review/service';

const ItemDetail = () => {
  // 로그인 시 리뷰 클릭이 가능하도록 하기
  // 본인이 작성한 게시글은 리뷰를 작성하도록 할까?
  const { itemId } = useParams();
  const isLogin = useAuthCheck();

  const { data, isPending, isError } = useQuery({
    ...itemQueryOption.detail(Number(itemId)),
    // initialData: { itemInfo: {id:null,name:"",price:00000,image:''}, itemUrl: '', itemAvgRate: 0, isMemberItem: false },
  });

  const [reviewInfo, setReviewInfo] = useState<GetSearchReviewListResponse>();

  const handleItem = () => {
    // TODO: 로그인 한 사용자가 아이템을 담을수 있는 기능
    setReviewInfo((prev) => prev);
  };

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonImage size="md" src={data.itemInfo.image} alt={data.itemInfo.name} />
        <ItemWrapper>
          <CommonText type="normalTitle" noOfLines={0}>
            {data.itemInfo.name}
          </CommonText>
          <ItemBox>
            <CommonIcon type="fillStar" color="blue.300" />
            <Box>
              <CommonText type="smallInfo" noOfLines={0}>
                {data.itemAvgRate === null ? 0 : data.itemAvgRate} / 5
              </CommonText>
            </Box>
          </ItemBox>
        </ItemWrapper>
        <CommonText type="normalInfo">{formatNumber(data.itemInfo.price)}</CommonText>
        <ButtonWrapper>
          <CommonButton type="mdSmall" onClick={handleItem} isDisabled={data.isMemberItem}>
            아이템 담기
          </CommonButton>
          <CommonButton type="link" src={data.itemUrl}>
            구매하러 가기
          </CommonButton>
        </ButtonWrapper>
        <CommonButton type="mdFull" isDisabled={!!isLogin}>
          리뷰 쓰기
        </CommonButton>
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
