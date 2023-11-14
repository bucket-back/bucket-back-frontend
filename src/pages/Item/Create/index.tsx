import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { CommonButton, CommonInput, CommonRadio, CommonText, Header } from '@/shared/components';

// 취미 불러오는 api
const initalHobby = ['수영', '자전거', '농구'];

interface ItemText {
  url: string;
}

const validateInput = (v: string) =>
  !(v.includes('<script>') || v.includes('</script>')) || '스크립트 태그를 사용할수 없습니다';

const ItemCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ItemText>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ItemText> = ({ url }) => {
    console.log(selectedHobby);
    console.log(url);

    // 성공했다면 input 유지

    // 실패했다면 input 빈칸
    reset();
  };

  // 크롤링해서 검색한 결과 간단하게 보여주면 좋을것 같다!

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
                <CommonRadio
                  values={initalHobby}
                  name="취미"
                  onChange={(value: string) => setSelectedHobby(value)}
                />
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

const Container = styled.main`
  padding: 0 2.44rem 2.44rem 2.44rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const BoxTop = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
