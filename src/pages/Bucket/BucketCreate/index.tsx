import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import {
  CommonButton,
  CommonDrawer,
  CommonInput,
  CommonRadio,
  CommonText,
  Header,
} from '@/shared/components';
import { Box, ButtonWrapper, Container, Form, Wrapper } from './style';
import BucketSelectItem from '@/features/bucket/components/BucketSelectItem';

const initalHobby = ['수영', '자전거', '농구'];

interface ItemText {
  bucket: string;
}

const BucketCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ItemText>({ mode: 'onBlur' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit: SubmitHandler<ItemText> = () => {};

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
                error={errors.bucket}
                {...register('bucket', { required: '버킷 이름은 필수입니다.' })}
              />
            </Box>
            <Box>
              <CommonText type="normalInfo" noOfLines={0}>
                취미별로 버킷을 생성할 수 있어요. 취미를 선택해주세요!
              </CommonText>
              <CommonRadio
                values={initalHobby}
                name="취미"
                onChange={(value: string) => setSelectedHobby(value)}
              />
            </Box>
            <Box>
              <CommonText type="normalInfo" noOfLines={0}>
                아이템을 하나 이상 선택해주세요.
              </CommonText>
              <CommonButton type="custom" onClick={onOpen} />
            </Box>
          </Wrapper>
          <ButtonWrapper>
            <CommonButton
              type="mdFull"
              isDisabled={!selectedHobby.length || !isValid || isSubmitting}
              isSubmit={true}
            >
              생성 완료
            </CommonButton>
          </ButtonWrapper>
        </Form>

        <CommonDrawer
          isOpen={isOpen}
          onClose={() => {
            // x버튼 누르면 selectedItem 초기화
            onClose();
          }}
          onClickFooterButton={() => {
            // selectedItem을 두개 선택했을때만 선택 완료하고 닫기
            onClose();
          }}
          isFull={true}
          footerButtonText="선택 완료"
        >
          <BucketSelectItem onClick={() => {}} />
        </CommonDrawer>
      </Container>
    </>
  );
};

export default BucketCreate;
