import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDrawer,
  CommonRadio,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { FormContainer, Wrapper, TextareaWrapper } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { itemQueryOption } from '@/features/item/service';
import { VoteSelectItem } from '@/features/vote/components';

interface Textarea {
  textarea: string;
}

const VoteCreate = () => {
  const { data: hobbyData } = useHobby();
  const [selectedHobby, setSelectedHobby] = useState<string>('');
  const currnetHobby = hobbyData?.hobbies.find(({ value }) => value === selectedHobby);
  const HangulHobby = hobbyData?.hobbies.map((hobby) => hobby.value);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { data: myItemsData } = useQuery({
    ...itemQueryOption.myItems({
      hobbyName: currnetHobby?.name,
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Textarea>();
  const { isOpen, onOpen, onClose } = useDrawer();
  const checkingItems = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked && selectedItems.length <= 1) {
      setSelectedItems(() => [...selectedItems, e.target.id]);
    } else if (!checked) {
      setSelectedItems(selectedItems.filter((item) => item !== e.target.id));
    }
    if (selectedItems.length > 1) {
      e.target.checked = false;
    }
  };
  if (!HangulHobby) {
    return;
  }
  const onSubmit: SubmitHandler<Textarea> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Header type="back" />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <CommonText type="normalTitle" noOfLines={0}>
            투표 생성하기
          </CommonText>
        </Wrapper>
        <Wrapper>
          <CommonText type="normalInfo" noOfLines={0}>
            취미를 선택해주세요.
          </CommonText>
          <CommonRadio
            values={HangulHobby!}
            name="취미"
            onChange={(value: string) => setSelectedHobby(value)}
          />
        </Wrapper>
        <Wrapper>
          <CommonText type="normalInfo" noOfLines={0}>
            아이템을 두개 선택해주세요
          </CommonText>
          <CommonButton type="custom" onClick={onOpen} />
        </Wrapper>
        <TextareaWrapper>
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
        </TextareaWrapper>
      </FormContainer>
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
        <VoteSelectItem myItemsData={myItemsData} onChange={checkingItems} />
      </CommonDrawer>
    </>
  );
};

export default VoteCreate;
