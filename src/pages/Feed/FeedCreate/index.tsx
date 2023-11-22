import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CommonButton,
  CommonDrawer,
  CommonRadio,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Container, ContentsWrapper, ContentsBox, HobbyBox, Form, ButtonBox } from './style';
import { FeedSelectBucket } from '@/features/feed/components';
import { useCreateFeed } from '@/features/feed/hooks';
import { useHobby } from '@/features/hobby/hooks';

interface Textarea {
  textarea: string;
}

const FeedCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState('');
  const [selectedBucket, setSelectedBucket] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Textarea>({ mode: 'onBlur' });

  const createFeed = useCreateFeed();

  const onSubmit: SubmitHandler<Textarea> = (data) => {
    createFeed.mutate({ bucketId: selectedBucket, content: data.textarea });
  };
  const { isOpen, onOpen, onClose } = useDrawer();

  const hobby = useHobby();
  const hobbyValues = hobby.data?.hobbies.map(({ value }) => value);

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">피드 생성하기</CommonText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContentsWrapper>
            <ContentsBox>
              <CommonText type="normalInfo">취미를 선택해주세요.</CommonText>
              <HobbyBox>
                <CommonRadio
                  values={hobbyValues || []}
                  name="취미"
                  onChange={(value: string) => setSelectedHobby(value)}
                />
              </HobbyBox>
            </ContentsBox>
            <ContentsBox>
              <CommonText type="normalInfo">버킷을 선택해주세요.</CommonText>
              <CommonButton type="custom" onClick={onOpen} />
            </ContentsBox>
            <ContentsBox>
              <CommonText type="normalInfo">피드 내용을 입력해주세요.</CommonText>

              <CommonTextarea
                size="sm"
                placeholder="내용을 입력해주세요."
                error={errors.textarea}
                {...register('textarea', {
                  required: '내용을 필수로 입력해주세요.',
                })}
              />
            </ContentsBox>
          </ContentsWrapper>
          <ButtonBox>
            <CommonButton
              type="mdFull"
              isSubmit
              isDisabled={!selectedHobby || !isValid || isSubmitting || !selectedBucket}
            >
              생성 완료
            </CommonButton>
          </ButtonBox>
        </Form>

        <CommonDrawer
          isOpen={isOpen}
          onClose={onClose}
          onClickFooterButton={onClose}
          isFull={true}
          footerButtonText="선택 완료"
        >
          <FeedSelectBucket
            onClick={(id) => {
              setSelectedBucket(id);
            }}
          />
        </CommonDrawer>
      </Container>
    </>
  );
};

export default FeedCreate;
