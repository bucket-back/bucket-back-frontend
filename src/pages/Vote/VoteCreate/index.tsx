import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  CommonButton,
  CommonDrawer,
  CommonRadio,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Body, Container, Form } from './style';
import { VoteSelectItem } from '@/features/vote/components';

interface Textarea {
  textarea: string;
}

const VoteCreate = () => {
  const initalHobby = ['수영', '자전거', '농구'];
  const [selectedHobby, setSelectedHobby] = useState<string>(initalHobby[1]);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Textarea>();
  const { isOpen, onOpen, onClose } = useDrawer();
  const onSubmit: SubmitHandler<Textarea> = (data) => {
    // 취미,버킷 선택했는지 안했는지 체크
    console.log(data, selectedHobby, selectedItem);
  };

  return (
    <>
      <Header type="back" />
      <Body>
        <Container>
          <CommonText type="normalTitle" noOfLines={0}>
            투표 생성하기
          </CommonText>
        </Container>
        <Container>
          <CommonText type="normalInfo" noOfLines={0}>
            취미를 선택해주세요.
          </CommonText>
          <CommonRadio
            values={initalHobby}
            name="취미"
            onChange={(value: string) => setSelectedHobby(value)}
          />
        </Container>
        <Container>
          <CommonText type="normalInfo" noOfLines={0}>
            아이템을 두개 선택해주세요
          </CommonText>
          <CommonButton type="custom" onClick={onOpen} />
        </Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CommonTextarea
            placeholder="투표 내용을 입력해주세요"
            size="sm"
            label="투표 내용"
            error={errors.textarea}
            {...register('textarea', {
              required: '내용을 필수를 입력해주세요',
            })}
          />
          <CommonButton type="mdFull" isSubmit={true}>
            생성 완료
          </CommonButton>
        </Form>
        <CommonDrawer
          isOpen={isOpen}
          onClose={() => {
            // x버튼 누르면 selectedItem 초기화
            onClose();
          }}
          onClickFooterButton={() => {
            // selectedItem을 두개 선택했을때만 선택 완료하고 닫기
            console.log(selectedItem);
            onClose();
          }}
          isFull={true}
          footerButtonText="선택 완료"
        >
          <VoteSelectItem onClick={(index) => setSelectedItem(index)} />
        </CommonDrawer>
      </Body>
    </>
  );
};

export default VoteCreate;
