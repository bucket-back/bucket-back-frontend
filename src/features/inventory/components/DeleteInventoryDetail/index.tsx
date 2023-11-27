import { useParams } from 'react-router-dom';
import { CommonDrawer } from '@/shared/components';
import { useDeleteInventory } from '../../hook';

interface DeleteInventoryDetailProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteInventoryDetail = ({ isOpen, onClose }: DeleteInventoryDetailProps) => {
  const { inventoryId } = useParams() as { nickname: string; inventoryId: string };
  const numberInventoryId = Number(inventoryId);
  const { mutate: deleteInventoryMutate } = useDeleteInventory();

  return (
    <CommonDrawer
      isOpen={isOpen}
      onClose={onClose}
      onClickFooterButton={() => deleteInventoryMutate(numberInventoryId)}
      isFull={false}
    >
      정말 인벤토리를 삭제하시겠습니까?
    </CommonDrawer>
  );
};

export default DeleteInventoryDetail;
