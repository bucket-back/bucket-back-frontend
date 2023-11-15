import { useNavigate } from 'react-router-dom';
import { CommonIconButton, CommonImage, CommonText } from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import { PositionWrapper, ButtonWrapper, ItemListWrapper } from './style';
import { ItemSummary } from '@/shared/types/item';

interface ItemListProps {
  id: ItemSummary['id'];
  image: ItemSummary['image'];
  price: ItemSummary['price'];
  name: ItemSummary['name'];
  isDelete: boolean;
  onClick?: (id: number) => void;
}

const ListItem = ({ id, image, price, name, isDelete, onClick }: ItemListProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDelete) {
      return;
    }
    navigate(`myitems/${id}`);
  };

  const handleDeleteClick = () => {
    onClick && onClick(id);
  };

  return (
    <PositionWrapper>
      {isDelete && (
        <ButtonWrapper>
          <CommonIconButton type="cancel" onClick={handleDeleteClick} />
        </ButtonWrapper>
      )}
      <ItemListWrapper onClick={handleClick}>
        <CommonImage size="sm" alt={name} src={image} />
        <CommonText type="normalInfo">{formatNumber(price)}</CommonText>
        <CommonText type="smallInfo" noOfLines={0}>
          {name}
        </CommonText>
      </ItemListWrapper>
    </PositionWrapper>
  );
};

export default ListItem;
