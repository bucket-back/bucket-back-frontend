import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

interface FormProps {
  review: string;
}

const ItemReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>({ mode: 'onBlur' });
  const [value, setValue] = useState<number>(0);

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(data.review);
    reset();
  };

  return (
    <>
      <Header type="back" />
      <Container>
        <ItemBoxFlex>
          <CommonImage size="sm" alt="아이템 이미지" />
          <ItemBoxLeft>
            <CommonText type="strongInfo" noOfLines={0}>
              아레나 취미활동 수영복
            </CommonText>
            <ItemBoxLeftBottom>
              <CommonText type="smallInfo" noOfLines={0}>
                {formatNumber(23000)}
              </CommonText>
              <ItemBoxLeftBottomRate>
                <CommonIcon type="fillStar" color="blue.300" />
                <Rate>
                  <CommonText type="smallInfo" noOfLines={0}>
                    4.5 / 5
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
              <CommonSlider
                value={value}
                onChange={(value) => {
                  setValue(value);
                }}
              />
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
          <CommonButton type="mdFull">리뷰 쓰기</CommonButton>
        </Form>
      </Container>
    </>
  );
};

export default ItemReview;
