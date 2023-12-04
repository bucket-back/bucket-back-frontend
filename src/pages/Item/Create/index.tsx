import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommonButton, CommonInput, CommonRadio, CommonText, Header } from '@/shared/components';
import { Container, Wrapper, Form, BoxTop, Box, HobbyWrapper } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { usePostItem } from '@/features/item/hooks';

interface ItemText {
  url: string;
}

const validateInput = (v: string) =>
  !(v.includes('<script>') || v.includes('</script>')) || '스크립트 태그를 사용할수 없습니다';

const PLACEHOLDERURL =
  'https://www.coupang.com/vp/products/7694535500?itemId=20584722958&vendorItemId=87659712741&sourceType=srp_product_ads&clickEventId=6717a120-87bb-11ee-9cee-15b675c1dd9d&korePlacement=15&koreSubPlacement=11&q=%EB%86%8D%EA%B5%AC&itemsCount=36&searchId=bbc4652630a74878a83e215b18e6ca01&rank=10&isAddedCart=';
const ItemCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ItemText>({ mode: 'onBlur' });

  const [selectedHobby, setSelectedHobby] = useState<string>('');

  const [showMessage, setShowMessage] = useState<boolean>(true);

  const { mutate: itemMutate } = usePostItem();

  const { isSuccess, data } = useHobby();

  const onSubmit: SubmitHandler<ItemText> = ({ url }) => {
    itemMutate({ hobbyValue: selectedHobby, itemUrl: url });
    reset();
  };

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle" noOfLines={0}>
          아이템 생성하기
        </CommonText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <BoxTop>
              <Box>
                <CommonText type="normalInfo" noOfLines={0}>
                  아이템에 맞는 취미를 선택해주세요.
                </CommonText>
                <HobbyWrapper>
                  <CommonRadio
                    values={isSuccess ? data?.hobbies.map(({ value }) => value) : []}
                    name="취미"
                    onChange={(value) => setSelectedHobby(value)}
                  />
                </HobbyWrapper>
              </Box>
              <Box>
                <CommonInput
                  onInput={() => setShowMessage(false)}
                  placeholder={PLACEHOLDERURL}
                  type="text"
                  width="full"
                  label="아이템을 추가할 URL을 입력해주세요"
                  error={errors.url}
                  {...register('url', {
                    required: '추가하고 싶은 상품 검색결과 url을 입력해주세요.',
                    pattern: {
                      value: /^https:\/\/(www)?/,
                      message:
                        '유효한 상품 검색 결과 URL이 아닙니다.쿠팡,네이버 쇼핑,다나와에 최적화 되어있습니다',
                    },
                    validate: {
                      validateInput: validateInput,
                    },
                  })}
                />
                {showMessage && (
                  <CommonText type="smallInfo">
                    다나와,쿠팡,네이버 쇼핑에 최적화되어있습니다
                  </CommonText>
                )}
              </Box>
            </BoxTop>
            <Box>
              <CommonButton
                type="mdFull"
                isDisabled={!selectedHobby.length || !isValid || isSubmitting}
                isSubmit={true}
              >
                생성 완료
              </CommonButton>
            </Box>
          </Wrapper>
        </Form>
      </Container>
    </>
  );
};

export default ItemCreate;
