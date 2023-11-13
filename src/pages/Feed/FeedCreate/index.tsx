import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import {
  CommonButton,
  CommonDrawer,
  CommonRadio,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { Container, ContentsWrapper, ContentsBox } from './style';
import { FeedSelectBucket } from '@/features/feed/components';

const initalHobby = ['수영', '자전거', '농구'];

interface Textarea {
  textarea: string;
}

const FeedCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState(initalHobby[0]);
  const [selectedBucket, setSelectedBucket] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Textarea>();
  const onSubmit: SubmitHandler<Textarea> = (data) => {
    console.log(data, selectedHobby, selectedBucket);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header type="back" />
      <Container>
        <ContentsWrapper>
          <CommonText type="normalTitle">피드 생성하기</CommonText>
          <ContentsBox>
            <CommonText type="normalInfo">취미를 선택해주세요.</CommonText>
            <CommonRadio
              values={initalHobby}
              name="취미"
              onChange={(value: string) => setSelectedHobby(value)}
            />
          </ContentsBox>
          <ContentsBox>
            <CommonText type="normalInfo">버킷을 선택해주세요.</CommonText>
            <CommonButton type="custom" onClick={onOpen} />
          </ContentsBox>
          <ContentsBox>
            <CommonText type="normalInfo">피드 내용을 입력해주세요.</CommonText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CommonTextarea
                size="sm"
                placeholder="내용을 입력해주세요."
                error={errors.textarea}
                {...register('textarea', {
                  required: '내용을 필수로 입력해주세요.',
                })}
              />
            </form>
          </ContentsBox>
        </ContentsWrapper>

        <CommonButton type="mdMiddle" onClick={() => {}}>
          생성 완료
        </CommonButton>
        <CommonDrawer
          isOpen={isOpen}
          onClose={onClose}
          onClickFooterButton={onClose}
          isFull={true}
          footerButtonText="선택 완료"
        >
          <FeedSelectBucket
            onClick={(id) => {
              console.log(id);
              setSelectedBucket(id);
            }}
          />
        </CommonDrawer>
      </Container>
    </>
  );
};

export default FeedCreate;
