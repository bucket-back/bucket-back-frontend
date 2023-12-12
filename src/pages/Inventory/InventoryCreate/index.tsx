import { useState } from 'react';
import { CommonButton, CommonDrawer, Header } from '@/shared/components';
import { useCustomToast, useDrawer } from '@/shared/hooks';
import { Container, CreateWrapper } from './style';
import InventorySelectItem from '@/features/inventory/components/InventorySelectItem';
import { useCreateInventory } from '@/features/inventory/hook';
import { SelectedItem } from '@/features/inventory/service';
import CreateTemplate from '@/shared/components/CreateTemplate';

interface Hobby {
  english: string;
  hangul: string;
}

const InventoryCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<Hobby>({ english: '', hangul: '' });
  const [prevSelectedHobby, setPrevSelectedHobby] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { isOpen, onOpen, onClose } = useDrawer();
  const { mutate: createInventoryMutate } = useCreateInventory();
  const openToast = useCustomToast();

  const onSubmit = () => {
    const itemIds = selectedItems.map((item) => item.id);
    if (selectedHobby.english === prevSelectedHobby) {
      createInventoryMutate({
        hobbyValue: selectedHobby.hangul,
        itemIds,
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
      <Container>
        <CreateWrapper>
          <CreateTemplate
            setSelectedHobby={setSelectedHobby}
            selectedHobby={selectedHobby}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onOpen={onOpen}
            type="inventory"
          />
        </CreateWrapper>
        <div>
          <CommonButton
            type="mdFull"
            onClick={onSubmit}
            isDisabled={!selectedHobby || !selectedItems.length}
          >
            생성 완료
          </CommonButton>
        </div>
      </Container>
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
        isDisabled={selectedItems.length < 1}
      >
        <InventorySelectItem
          selectedHobby={selectedHobby.english}
          onChange={setSelectedItems}
          selectedItems={selectedItems}
        />
      </CommonDrawer>
    </>
  );
};
export default InventoryCreate;
