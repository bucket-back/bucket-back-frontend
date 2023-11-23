import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonSlider,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import {
  Container,
  DivderWrapper,
  ItemBoxFlex,
  ItemBoxLeft,
  ItemBoxLeftBottomRate,
  Rate,
  ItemBoxLeftBottom,
  Form,
  FormWrapper,
  ItemBoxColumn,
} from './style';
import { itemQueryOption } from '@/features/item/service';
import { useEditReview } from '@/features/review/hooks';
import { reviewQueryOption } from '@/features/review/service';

interface FormProps {
  review: string;
}

const ItemReviewEdit = () => {
  const { itemId, reviewId } = useParams();

  const { data, isPending, isError } = useQuery({ ...itemQueryOption.detail(Number(itemId)) });

  const {
    data: reviewInfo,
    isPending: reviewPending,
    isError: reviewError,
  } = useQuery({
    ...reviewQueryOption.detail({ itemId: Number(itemId), reviewId: Number(reviewId) }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>({
    mode: 'onBlur',
  });

  const [value, setValue] = useState<number>(0);

  const { mutate: reviewMutate } = useEditReview();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    reviewMutate({
      itemId: Number(itemId),
      reviewId: Number(reviewId),
      content: data.review,
      rating: value,
    });
    reset();
  };

  useEffect(() => {
    if (reviewInfo) {
      setValue(reviewInfo.rate);
      reset({ review: reviewInfo.content });
    }

    return () => {
      setValue(0);
      reset();
    };
  }, [reviewInfo]);

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
        <ItemBoxFlex>
          <CommonImage size="sm" src={data.itemInfo.image} alt={data.itemInfo.name} />
          <ItemBoxLeft>
            <CommonText type="strongInfo" noOfLines={0}>
              {data.itemInfo.name}
            </CommonText>
            <ItemBoxLeftBottom>
              <CommonText type="smallInfo" noOfLines={0}>
                {formatNumber(data.itemInfo.price)}
              </CommonText>
              <ItemBoxLeftBottomRate>
                <CommonIcon type="fillStar" color="blue.300" />
                <Rate>
                  <CommonText type="smallInfo" noOfLines={0}>
                    {data.itemAvgRate === null ? 0 : data.itemAvgRate} / 5
                  </CommonText>
                </Rate>
              </ItemBoxLeftBottomRate>
            </ItemBoxLeftBottom>
          </ItemBoxLeft>
        </ItemBoxFlex>
        <DivderWrapper>
          <CommonDivider size="sm" />
        </DivderWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <ItemBoxColumn>
              <CommonText type="smallInfo">평점</CommonText>
              <Rate>
                <CommonText type="smallInfo" noOfLines={0}>
                  {value} / 5
                </CommonText>
              </Rate>
              <CommonSlider value={value} onChange={(value) => setValue(value)} />
            </ItemBoxColumn>
            <ItemBoxColumn>
              <CommonText type="smallInfo">리뷰 작성</CommonText>
              <CommonTextarea
                placeholder="리뷰를 작성해주세요"
                error={errors.review}
                size="base"
                {...register('review', {
                  minLength: 1,
                  required: '한글자 이상 리뷰를 남겨주세요!',
                })}
              />
            </ItemBoxColumn>
          </FormWrapper>
          <CommonButton type="mdFull" isDisabled={!value} isSubmit={true}>
            리뷰 쓰기
          </CommonButton>
        </Form>
      </Container>
    </>
  );
};

export default ItemReviewEdit;
