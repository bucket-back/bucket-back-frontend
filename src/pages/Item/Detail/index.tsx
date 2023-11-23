import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ReviewBox,
} from './style';
import ItemComment from '@/features/item/components/ItemComment/index';
import { useTakeItem } from '@/features/item/hooks';
import itemQueryOption from '@/features/item/service/queryOption';
import reviewQueryOption from '@/features/review/service/queryOption';

const ItemDetail = () => {
  // 로그인 시 리뷰 클릭이 가능하도록 하기
  const { itemId } = useParams();

  const navigate = useNavigate();

  const isLogin = useAuthCheck();

  const { data, isPending, isError } = useQuery({
    ...itemQueryOption.detail(Number(itemId)),
    initialData: {
      itemInfo: { id: 0, name: '', price: 0, image: '' },
      itemUrl: '',
      itemAvgRate: 0,
      isMemberItem: false,
    },
  });

  const {
    data: reviewInfo,
    isPending: reviewPending,
    isError: reviewError,
  } = useQuery({
    ...reviewQueryOption.lists({ itemId: Number(itemId), cursorId: '', size: 10 }),
    initialData: {
      itemReviewTotalCount: 0,
      nextCursorId: '',
      totalCount: 0,
      reviews: [],
    },
  });

  const { mutate: itemTakeMutate } = useTakeItem();

  const isReviewed = reviewInfo.reviews.findIndex((value) => value.isReviewed);

  const handleItem = () => {
    itemTakeMutate([String(data.itemInfo.id)]);
  };

  if (isPending || reviewPending) {
    return <>Loading...</>;
  }

  if (isError || reviewError) {
    return <>Error...</>;
  }

  return (
    <>
      <Header type="back" />
      <Container>
        <div>
          <CommonImage size="md" src={data.itemInfo.image} alt={data.itemInfo.name} />
        </div>
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
        <CommonButton
          type="mdFull"
          isDisabled={isLogin === false}
          onClick={() =>
            isReviewed > -1
              ? navigate(`/${itemId}/review/${reviewInfo.reviews[isReviewed].reviewId}/edit`)
              : navigate(`/item/${itemId}/review/create`)
          }
        >
          {isReviewed > -1 ? '리뷰 수정' : '리뷰 작성'}
        </CommonButton>
      </Container>
      <div>
        <CommonDivider size="lg" />
        <CommentNumberWrapper>
          <CommonText type="normalInfo">총 {reviewInfo.totalCount}개의 댓글</CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        {reviewInfo.reviews.length > 0 ? (
          reviewInfo.reviews.map(({ content, createdAt, memberInfo, rate, reviewId }) => (
            <Fragment key={reviewId}>
              <ItemComment
                content={content}
                createAt={createdAt}
                memberInfo={memberInfo}
                rate={rate}
                reviewId={reviewId}
                editPath={`/${itemId}/review/${reviewInfo.reviews[isReviewed].reviewId}/edit`}
              />
              <CommonDivider size="sm" />
            </Fragment>
          ))
        ) : (
          <ReviewBox>리뷰가 없습니다...</ReviewBox>
        )}
      </CommentsContainer>
    </>
  );
};

export default ItemDetail;
