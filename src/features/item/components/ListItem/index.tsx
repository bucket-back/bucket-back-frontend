import { useNavigate } from 'react-router-dom';
import { CommonImage, CommonText } from '@/shared/components';
import { ellipsisName, formatNumber } from '@/shared/utils';
import { PositionWrapper, ItemListWrapper, ImageInput, ImageLabel } from './style';
import { ItemSummary } from '@/shared/types/item';

interface ItemListProps {
  id: ItemSummary['id'];
  image: ItemSummary['image'];
  price: ItemSummary['price'];
  name: ItemSummary['name'];
  isDelete: boolean;
  isDeleteMode: boolean;
  handleChange: (id: number) => void;
}

const ListItem = ({
  id,
  image,
  price,
  name,
  isDelete,
  isDeleteMode,
  handleChange,
}: ItemListProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDelete) {
      return;
    }
    navigate(`/item/${id}`);
  };

  return isDelete ? (
    <PositionWrapper isDelete={isDelete} isDeleteMode={isDeleteMode}>
      <ItemListWrapper>
        <ImageInput type="checkbox" id={String(id)} onChange={() => handleChange(id)} />
        <ImageLabel htmlFor={String(id)}>
          <CommonImage size="sm" src={image} />
        </ImageLabel>
        <div>
          <CommonText type="normalInfo">{formatNumber(price)}</CommonText>
          <CommonText type="smallInfo" noOfLines={0}>
            {ellipsisName(name, 20)}
          </CommonText>
        </div>
      </ItemListWrapper>
    </PositionWrapper>
  ) : (
    <PositionWrapper>
      <ItemListWrapper onClick={handleClick}>
        <CommonImage size="sm" alt={name} src={image} />
        <div>
          <CommonText type="normalInfo">{formatNumber(price)}</CommonText>
          <CommonText type="smallInfo" noOfLines={0}>
            {ellipsisName(name, 20)}
          </CommonText>
        </div>
      </ItemListWrapper>
    </PositionWrapper>
  );
};

export default ListItem;
