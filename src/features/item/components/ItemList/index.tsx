import { useNavigate } from 'react-router-dom';
import { CommonImage, CommonText } from '@/shared/components';
import { ellipsisName, formatNumber } from '@/shared/utils';
import { PositionWrapper, ItemListWrapper } from './style';
import { ItemSummary } from '@/shared/types/item';

interface ItemListProps {
  id: ItemSummary['id'];
  image: ItemSummary['image'];
  price: ItemSummary['price'];
  name: ItemSummary['name'];
  isDelete: boolean;
  onClick?: (id: number) => void;
}

const ListItem = ({ id, image, price, name, isDelete }: ItemListProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDelete) {
      return;
    }
    navigate(`/item/${id}`);
  };

  return (
    <PositionWrapper>
      <ItemListWrapper onClick={handleClick}>
        <CommonImage size="sm" alt={name} src={image} />
        <CommonText type="normalInfo">{formatNumber(price)}</CommonText>
        <CommonText type="smallInfo" noOfLines={0}>
          {ellipsisName(name, 20)}
        </CommonText>
      </ItemListWrapper>
    </PositionWrapper>
  );
};

export default ListItem;
