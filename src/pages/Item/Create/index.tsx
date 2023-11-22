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

const ItemCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ItemText>({ mode: 'onBlur' });

  const [selectedHobby, setSelectedHobby] = useState<string>('');

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
                  placeholder="https://www.musinsa.com/app/goods/2482269?loc=goods_rank"
                  type="text"
                  width="full"
                  label="아이템을 추가할 URL을 입력해주세요"
                  error={errors.url}
                  {...register('url', {
                    required: '추가하고 싶은 상품 검색결과 url을 입력해주세요.',
                    pattern: {
                      value: /^https:\/\/www\..+\/?.*$/,
                      message: '유효한 상품 검색 결과 URL이 아닙니다.',
                    },
                    validate: {
                      validateInput: validateInput,
                    },
                  })}
                />
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
