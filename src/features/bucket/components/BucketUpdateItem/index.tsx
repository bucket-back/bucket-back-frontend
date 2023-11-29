import { CommonImage, CommonText } from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import { Container, ImageInput, ImageLabel, ItemBox, ItemsWrapper } from './style';
import { GetMyItemsResponse } from '@/features/item/service';

interface SelectedItem {
  id: number;
  image: string;
}

interface BucketUpdateItemProps {
  items: GetMyItemsResponse;
  selectedItems: number[];
  onClick: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
}

const BucketUpdateItem = ({ items, selectedItems, onClick }: BucketUpdateItemProps) => {
  const handleClick = ({ id, image }: SelectedItem) => {
    onClick((prev) => {
      if (prev.map((item) => item.id).includes(id)) {
        return prev.filter((item) => item.id !== id);
      }

      return [...prev, { id, image }];
    });
  };

  return (
    <Container>
      <CommonText type="normalTitle">아이템 선택</CommonText>
      <CommonText type="subStrongInfo">총 {items.totalMemberItemCount}개의 아이템</CommonText>
      <ItemsWrapper>
        {items.summaries.map(({ itemInfo }) => (
          <ItemBox key={itemInfo.id}>
            <ImageInput
              type="checkbox"
              id={String(itemInfo.id)}
              onChange={() => handleClick({ id: itemInfo.id, image: itemInfo.image })}
              checked={selectedItems.includes(itemInfo.id)}
            />
            <ImageLabel htmlFor={String(itemInfo.id)}>
              <CommonImage size="sm" src={itemInfo.image} />
            </ImageLabel>
            <CommonText type="normalInfo">{formatNumber(itemInfo.price)}</CommonText>
            <CommonText type="smallInfo">{itemInfo.name}</CommonText>
          </ItemBox>
        ))}
      </ItemsWrapper>
    </Container>
  );
};

export default BucketUpdateItem;
