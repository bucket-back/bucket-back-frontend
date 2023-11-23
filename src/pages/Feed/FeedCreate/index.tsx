import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDrawer,
  CommonRadio,
  CommonText,
  CommonTextarea,
  DividerImage,
  Header,
} from '@/shared/components';
import { useDrawer, useUserInfo } from '@/shared/hooks';
import {
  Container,
  ContentsWrapper,
  ContentsPanel,
  HobbyBox,
  Form,
  ButtonWrapper,
  SelectedBucketBox,
} from './style';
import { bucketQueryOption } from '@/features/bucket/service';
import { FeedSelectBucket } from '@/features/feed/components';
import { useCreateFeed } from '@/features/feed/hooks';
import { useHobby } from '@/features/hobby/hooks';

interface SelectedBucket {
  id: number;
  images: string[];
}

interface Textarea {
  textarea: string;
}

const FeedCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState('');
  const [selectedBucket, setSelectedBucket] = useState<SelectedBucket | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Textarea>({ mode: 'onBlur' });
  const userInfo = useUserInfo();

  const createFeed = useCreateFeed();
  const bucketList = useQuery(
    bucketQueryOption.list({ hobby: selectedHobby, nickname: userInfo?.nickname || '' })
  );

  const onSubmit: SubmitHandler<Textarea> = (data) => {
    if (selectedBucket) {
      createFeed.mutate({ bucketId: selectedBucket.id, content: data.textarea });
    }
  };
  const { isOpen, onOpen, onClose } = useDrawer();

  const hobby = useHobby();
  const hobbyObj = hobby.data?.hobbies.reduce<Record<string, string>>(
    (acc, cur) => ((acc[cur.value] = cur.name), acc),
    {}
  );

  const hobbyValues = Object.keys(hobbyObj || {});

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">피드 생성하기</CommonText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContentsWrapper>
            <ContentsPanel>
              <CommonText type="normalInfo">취미를 선택해주세요.</CommonText>
              <HobbyBox>
                {hobbyObj && (
                  <CommonRadio
                    values={hobbyValues}
                    name="취미"
                    onChange={(value: string) => setSelectedHobby(hobbyObj[value])}
                  />
                )}
              </HobbyBox>
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">버킷을 선택해주세요.</CommonText>
              {selectedBucket ? (
                <SelectedBucketBox
                  onClick={() => {
                    onOpen();
                    setSelectedBucket(null);
                  }}
                >
                  <DividerImage images={selectedBucket.images} type="base" />
                </SelectedBucketBox>
              ) : (
                <CommonButton type="custom" onClick={onOpen} isDisabled={!selectedHobby} />
              )}
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">피드 내용을 입력해주세요.</CommonText>

              <CommonTextarea
                size="sm"
                placeholder="내용을 입력해주세요."
                error={errors.textarea}
                {...register('textarea', {
                  required: '내용을 필수로 입력해주세요.',
                })}
              />
            </ContentsPanel>
          </ContentsWrapper>
          <ButtonWrapper>
            <CommonButton
              type="mdFull"
              isSubmit
              isDisabled={!selectedHobby || !isValid || isSubmitting || !selectedBucket}
            >
              생성 완료
            </CommonButton>
          </ButtonWrapper>
        </Form>

        <CommonDrawer
          isOpen={isOpen}
          onClose={onClose}
          onClickFooterButton={onClose}
          isFull={true}
          isDisabled={!selectedBucket}
          footerButtonText="선택 완료"
        >
          {bucketList.data && (
            <FeedSelectBucket
              selectedBucket={selectedBucket?.id || 0}
              bucketList={bucketList.data}
              onClick={setSelectedBucket}
            />
          )}
        </CommonDrawer>
      </Container>
    </>
  );
};

export default FeedCreate;
