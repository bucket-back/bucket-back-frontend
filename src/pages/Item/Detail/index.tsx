import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonSpinner,
  CommonText,
  Header,
} from '@/shared/components';
import { useAuthCheck, useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  Container,
  ItemWrapper,
  ItemBox,
  ButtonWrapper,
  CommentNumberWrapper,
  CommentsContainer,
  Box,
  NoResult,
} from './style';
import { ItemComment } from '@/features/item/components';
import { useTakeItem } from '@/features/item/hooks';
import { itemQueryOption } from '@/features/item/service';
import { reviewQueryOption } from '@/features/review/service';
import { ImageBorder } from '@/shared/styles/ImageBorder';

const ItemDetail = () => {
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
      isReviewed: false,
    },
  });

  const {
    data: reviewInfo,
    isPending: reviewPending,
    isError: reviewError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...reviewQueryOption.infiniteList({ itemId: Number(itemId), size: 2 }),
    select: (data) => {
      return {
        totalCount: data.pages[0].itemReviewTotalCount,
        reviews: data.pages.flatMap(({ reviews }) => reviews),
      };
    },
  });

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  const { mutate: itemTakeMutate } = useTakeItem();

  const isReviewed = reviewInfo?.reviews.findIndex(({ isReviewed }) => isReviewed);

  const handleItem = () => {
    itemTakeMutate([String(data.itemInfo.id)]);
  };

  if (isPending || reviewPending) {
    return (
      <NoResult>
        <CommonSpinner size="xl" />
      </NoResult>
    );
  }

  if (isError || reviewError) {
    return <NoResult>Error...</NoResult>;
  }

  return (
    <>
      <Header type="back" />
      <Container>
        <ImageBorder>
          <CommonImage size="md" src={data.itemInfo.image} alt={data.itemInfo.name} />
        </ImageBorder>
        <ItemWrapper>
          <CommonText type="strongInfo" noOfLines={0}>
            {data.itemInfo.name}
          </CommonText>
          <ItemBox>
            <CommonText type="normalInfo">{formatNumber(data.itemInfo.price)}</CommonText>
            <Box>
              <CommonIcon type="fillStar" color="blue.300" />
              <CommonText type="smallInfo" noOfLines={0}>
                {data.itemAvgRate === null ? 0 : data.itemAvgRate} / 5
              </CommonText>
            </Box>
          </ItemBox>
        </ItemWrapper>
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
            isReviewed! > -1
              ? navigate(`/${itemId}/review/${reviewInfo.reviews[isReviewed!].reviewId}/edit`)
              : navigate(`/item/${itemId}/review/create`)
          }
        >
          {data.isReviewed ? '리뷰 수정' : '리뷰 작성'}
        </CommonButton>
      </Container>
      <div>
        <CommonDivider size="lg" />
        <CommentNumberWrapper>
          <CommonText type="normalInfo">총 {reviewInfo.totalCount}개의 리뷰</CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        <>
          {reviewInfo.reviews.map(
            ({ content, createdAt, memberInfo, reviewId, isReviewed, rate }) => (
              <Fragment key={reviewId}>
                <ItemComment
                  content={content}
                  createAt={createdAt}
                  memberInfo={memberInfo}
                  itemId={itemId!}
                  reviewId={reviewId}
                  isReviewed={isReviewed}
                  rate={rate}
                  editPath={`/${itemId}/review/${reviewId}/edit`}
                />
                <CommonDivider size="sm" />
              </Fragment>
            )
          )}
          {hasNextPage ? (
            <div ref={ref} style={{ height: '1rem' }} />
          ) : (
            <NoResult>등록된 리뷰가 없습니다...</NoResult>
          )}
        </>
      </CommentsContainer>
    </>
  );
};

export default ItemDetail;
