import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDrawer,
  CommonImage,
  CommonRadio,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { FormContainer, Wrapper, TextareaWrapper, RadioBox, SelectedItems } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { itemQueryOption } from '@/features/item/service';
import { VoteSelectItem } from '@/features/vote/components';
import { useCreateVote } from '@/features/vote/hooks';

interface Textarea {
  textarea: string;
}
interface SelectedItem {
  id: string;
  src: string;
}

const VoteCreate = () => {
  const { data: hobbyData } = useHobby();
  const [selectedHobby, setSelectedHobby] = useState<string>('');
  const currnetHobby = hobbyData?.hobbies.find(({ value }) => value === selectedHobby);
  const HangulHobby = hobbyData?.hobbies.map((hobby) => hobby.value);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { data: myItemsData } = useQuery({
    ...itemQueryOption.myItems({
      hobbyName: currnetHobby?.name,
    }),
  });
  const { mutate: CreateVoteMuate } = useCreateVote();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Textarea>();
  const { isOpen, onOpen, onClose } = useDrawer();
  const checkingItems = (e: ChangeEvent<HTMLInputElement>, src: string) => {
    const checked = e.target.checked;
    if (checked && selectedItems.length <= 1) {
      setSelectedItems(() => [...selectedItems, { id: e.target.id, src: src }]);
    } else if (!checked) {
      setSelectedItems(selectedItems.filter(({ id }) => id !== e.target.id));
    }
    if (selectedItems.length > 1) {
      e.target.checked = false;
    }
  };
  if (!HangulHobby) {
    return;
  }
  const onSubmit: SubmitHandler<Textarea> = (data) => {
    CreateVoteMuate({
      hobby: selectedHobby,
      content: data.textarea,
      item1Id: Number(selectedItems[0].id),
      item2Id: Number(selectedItems[1].id),
    });
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
          <RadioBox>
            <CommonRadio
              values={HangulHobby!}
              name="취미"
              onChange={(value: string) => {
                setSelectedHobby(value);
                setSelectedItems([]);
              }}
            />
          </RadioBox>
        </Wrapper>
        <Wrapper>
          <CommonText type="normalInfo" noOfLines={0}>
            아이템을 두개 선택해주세요
          </CommonText>
          {selectedItems.length <= 1 ? (
            <CommonButton type="custom" onClick={onOpen} />
          ) : (
            <SelectedItems>
              {selectedItems.map(({ id, src }) => (
                <CommonImage
                  key={id}
                  src={src}
                  size="sm"
                  onClick={() => {
                    onOpen();
                    setSelectedItems([]);
                  }}
                />
              ))}
            </SelectedItems>
          )}
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
          setSelectedItems([]);
          onClose();
        }}
        onClickFooterButton={() => {
          onClose();
        }}
        isFull={true}
        footerButtonText="선택 완료"
        isDisabled={selectedItems.length <= 1}
      >
        <VoteSelectItem myItemsData={myItemsData} onChange={checkingItems} />
      </CommonDrawer>
    </>
  );
};

export default VoteCreate;
