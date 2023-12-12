import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  CommonButton,
  CommonDrawer,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { useCustomToast, useDrawer } from '@/shared/hooks';
import { SelectedHobby, SelectedItem } from '@/shared/types';
import { FormContainer, TextareaWrapper } from './style';
import { VoteSelectItem } from '@/features/vote/components';
import { useCreateVote } from '@/features/vote/hooks';
import CreateTemplate from '@/shared/components/CreateTemplate';

interface Textarea {
  textarea: string;
}

const VoteCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<SelectedHobby>({ english: '', hangul: '' });
  const [prevSelectedHobby, setPrevSelectedHobby] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { mutate: CreateVoteMutate } = useCreateVote();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Textarea>();
  const { isOpen, onOpen, onClose } = useDrawer();
  const openToast = useCustomToast();

  const onSubmit: SubmitHandler<Textarea> = (data) => {
    if (selectedHobby.english === prevSelectedHobby) {
      CreateVoteMutate({
        hobby: selectedHobby.hangul,
        content: data.textarea,
        item1Id: Number(selectedItems[0].id),
        item2Id: Number(selectedItems[1].id),
      });
    } else {
      openToast({
        type: 'error',
        message: `${selectedHobby.hangul}취미에 맞는 아이템을 선택해주세요.`,
      });
    }
  };

  return (
    <>
      <Header type="back" />
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div>
          <CommonText type="normalTitle" noOfLines={0}>
            투표 생성하기
          </CommonText>
        </div>
        <CreateTemplate
          setSelectedHobby={setSelectedHobby}
          selectedHobby={selectedHobby}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          onOpen={onOpen}
          type="vote"
        />
        <TextareaWrapper>
          <CommonTextarea
            placeholder="투표 내용을 입력해주세요."
            size="sm"
            label="투표 내용"
            error={errors.textarea}
            {...register('textarea', {
              required: '내용을 필수로 입력해주세요.',
              maxLength: {
                value: 1000,
                message: '최대 1000자 이하로 입력해주세요.',
              },
            })}
          />
          <CommonButton
            type="mdFull"
            isSubmit={true}
            isDisabled={!selectedItems.length || !selectedHobby.english}
          >
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
          setPrevSelectedHobby(selectedHobby.english);
          onClose();
        }}
        isFull={true}
        footerButtonText="선택 완료"
        isDisabled={selectedItems.length <= 1}
      >
        <VoteSelectItem
          onChange={setSelectedItems}
          selectedItems={selectedItems}
          selectedHobby={selectedHobby.english}
        />
      </CommonDrawer>
    </>
  );
};

export default VoteCreate;
