import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDrawer,
  CommonImage,
  CommonInput,
  CommonRadio,
  CommonText,
  Header,
} from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Box, ButtonWrapper, Container, Form, HobbyBox, SelectedItemsBox, Wrapper } from './style';
import { BucketSelectItem } from '@/features/bucket/components';
import { useCreateBucket } from '@/features/bucket/hooks';
import { useHobby } from '@/features/hobby/hooks';
import { itemQueryOption } from '@/features/item/service';

interface SelectedItems {
  id: number;
  image: string;
}

interface BucketInfo {
  name: string;
}

const BucketCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<string | undefined>('');
  const [selectedItems, setSelectedItems] = useState<SelectedItems[]>([]);
  const createBucket = useCreateBucket();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BucketInfo>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<BucketInfo> = (data) => {
    if (selectedHobby) {
      createBucket.mutate({
        hobbyValue: selectedHobby,
        name: data.name,
        itemIds: selectedItems.map((item) => item.id),
      });
    }
  };

  const hobby = useHobby();
  const hobbyData = hobby.isSuccess
    ? hobby.data?.hobbies.reduce<Record<string, string>>(
        (acc, cur) => ((acc[cur.value] = cur.name), acc),
        {}
      )
    : {};

  const hobbyValues = Object.keys(hobbyData || {});

  const items = useQuery(
    itemQueryOption.myItems({ hobbyName: selectedHobby ? hobbyData[selectedHobby] : '' })
  );

  const { isOpen, onOpen, onClose } = useDrawer();

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle" noOfLines={0}>
          새 버킷만들기
        </CommonText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <Box>
              <CommonInput
                placeholder="버킷 이름을 입력해주세요."
                type="text"
                width="full"
                error={errors.name}
                {...register('name', { required: '버킷 이름은 필수입니다.' })}
              />
            </Box>
            <Box>
              <CommonText type="normalInfo" noOfLines={0}>
                취미별로 버킷을 생성할 수 있어요. 취미를 선택해주세요!
              </CommonText>
              <HobbyBox>
                {hobbyData && (
                  <CommonRadio
                    values={hobbyValues || []}
                    name="취미"
                    onChange={(value: string) => setSelectedHobby(value)}
                  />
                )}
              </HobbyBox>
            </Box>
            <Box>
              <CommonText type="normalInfo" noOfLines={0}>
                아이템을 하나 이상 선택해주세요.
              </CommonText>
              <SelectedItemsBox>
                {selectedItems.length === 0 ? (
                  <CommonButton type="custom" isDisabled={!selectedHobby} onClick={onOpen} />
                ) : (
                  selectedItems.map(({ id, image }) => (
                    <CommonImage
                      key={id}
                      size="sm"
                      src={image}
                      onClick={() => {
                        onOpen();
                        setSelectedItems([]);
                      }}
                    />
                  ))
                )}
              </SelectedItemsBox>
            </Box>
          </Wrapper>
          <ButtonWrapper>
            <CommonButton
              type="mdFull"
              isDisabled={
                !selectedHobby?.length || !selectedItems.length || !isValid || isSubmitting
              }
              isSubmit={true}
            >
              생성 완료
            </CommonButton>
          </ButtonWrapper>
        </Form>

        <CommonDrawer
          isOpen={isOpen}
          onClose={() => {
            setSelectedItems([]);
            onClose();
          }}
          onClickFooterButton={() => {
            onClose();
          }}
          isDisabled={selectedItems.length < 1}
          isFull={true}
          footerButtonText="선택 완료"
        >
          <BucketSelectItem
            items={items.data!}
            onClick={setSelectedItems}
            selectedItems={selectedItems.map(({ id }) => id)}
          />
        </CommonDrawer>
      </Container>
    </>
  );
};

export default BucketCreate;
