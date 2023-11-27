import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommonDrawer } from '@/shared/components';
import { useUpdateInventory } from '../../hook';
import { SelectedItem } from '../../service';
import InventorySelectItem from '../InventorySelectItem';
import { useHobby } from '@/features/hobby/hooks';
import { inventoryItemInfo } from '@/shared/types/inventory';

interface UpdateInventoryDetailProps {
  isOpen: boolean;
  onClose: () => void;
  inventoryItemInfos: inventoryItemInfo[];
  inventoryHobby: string;
}

const UpdateInventoryDetail = ({
  isOpen,
  onClose,
  inventoryItemInfos,
  inventoryHobby,
}: UpdateInventoryDetailProps) => {
  const { data: hobbyData } = useHobby();
  const { nickname, inventoryId } = useParams() as { nickname: string; inventoryId: string };
  const numberInventoryId = Number(inventoryId);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const currentHobby = hobbyData?.hobbies.find(({ value }) => value === inventoryHobby);

  const { mutate: updateInventoryMutate } = useUpdateInventory({
    nickname: nickname,
    inventoryId: numberInventoryId,
    hobbyName: String(currentHobby?.name),
  });

  const onSubmit = () => {
    const itemIds = selectedItems.map((item) => item.id);
    const prevItemIds = inventoryItemInfos.map((item) => item.id);
    const isSameItems = JSON.stringify(prevItemIds) === JSON.stringify(itemIds);
    !isSameItems &&
      updateInventoryMutate({
        inventoryId: numberInventoryId,
        itemIds,
      });
  };

  return (
    <>
      <CommonDrawer
        isOpen={isOpen}
        onClose={() => {
          setSelectedItems([]);
          onClose();
        }}
        onClickFooterButton={() => {
          onSubmit();
          onClose();
        }}
        isFull={true}
        footerButtonText="수정 완료"
        isDisabled={selectedItems.length < 1}
      >
        <InventorySelectItem
          selectedHobby={currentHobby?.name || ''}
          onChange={setSelectedItems}
          selectedItems={selectedItems}
          inventoryId={inventoryId}
        />
      </CommonDrawer>
    </>
  );
};

export default UpdateInventoryDetail;
