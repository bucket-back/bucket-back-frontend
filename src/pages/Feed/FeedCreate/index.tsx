import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommonButton, CommonRadio, CommonText, CommonTextarea, Header } from '@/shared/components';
import { Container, ContentsWrapper, ContentsBox } from './style';

const initalHobby = ['수영', '자전거', '농구'];

interface Textarea {
  textarea: string;
}

const FeedCreate = () => {
  const [selected, setSelected] = useState(initalHobby[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Textarea>();
  const onSubmit: SubmitHandler<Textarea> = (data) => console.log(data);

  console.log(selected);

  return (
    <>
      <Header type="back" />
      <Container>
        <ContentsWrapper>
          <CommonText type="normalTitle">피드 생성하기</CommonText>
          <ContentsBox>
            <CommonText type="normalInfo">취미를 선택해주세요.</CommonText>
            <CommonRadio values={initalHobby} name="취미" onChange={setSelected} />
          </ContentsBox>
          <ContentsBox>
            <CommonText type="normalInfo">버킷을 선택해주세요.</CommonText>
            <CommonButton type="custom" isDisabled={false} onClick={() => {}} />
          </ContentsBox>
          <ContentsBox>
            <CommonText type="normalInfo">피드 내용을 입력해주세요.</CommonText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CommonTextarea
                size="sm"
                placeholder="내용을 입력해주세요."
                error={errors.textarea}
                {...register('textarea')}
              />
            </form>
          </ContentsBox>
        </ContentsWrapper>

        <CommonButton type="mdMiddle" isDisabled={false} onClick={() => {}}>
          생성 완료
        </CommonButton>
      </Container>
    </>
  );
};

export default FeedCreate;
