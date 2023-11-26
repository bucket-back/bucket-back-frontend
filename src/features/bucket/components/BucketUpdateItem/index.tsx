import { CommonImage, CommonText } from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import { Container, ItemsWrapper } from './style';
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
      <CommonText type="subStrongInfo">총 {items.totalCount}개의 아이템</CommonText>
      <ItemsWrapper>
        {items.summaries.map(({ itemInfo }) => (
          <div
            key={itemInfo.id}
            style={{ border: selectedItems.includes(itemInfo.id) ? '1px solid' : undefined }}
          >
            <CommonImage
              size="sm"
              src={itemInfo.image}
              onClick={() => handleClick({ id: itemInfo.id, image: itemInfo.image })}
            />
            <CommonText type="normalInfo">{formatNumber(itemInfo.price)}원</CommonText>
            <CommonText type="smallInfo">{itemInfo.name}</CommonText>
          </div>
        ))}
      </ItemsWrapper>
    </Container>
  );
};

export default BucketUpdateItem;
