import { useNavigate } from 'react-router-dom';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import { Body, Container, ImageInput, ImageLabel, ItemBox, ItemsWrapper } from './style';
import { GetMyItemsResponse } from '@/features/item/service';

interface SelectedItem {
  id: number;
  src: string;
}

interface BucketSelectItemPorps {
  items: GetMyItemsResponse;
  onClick: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
}

const BucketSelectItem = ({ items, onClick }: BucketSelectItemPorps) => {
  const navigate = useNavigate();

  const handleClick = ({ id, src }: SelectedItem) => {
    onClick((prev) => {
      if (prev.map((item) => item.id).includes(id)) {
        return prev.filter((item) => item.id !== id);
      }

      return [...prev, { id, src }];
    });
  };

  return (
    <>
      <Body>
        <CommonText type="normalTitle">아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총 {items.totalCount}개의 아이템</CommonText>
        <ItemsWrapper>
          {items.summaries.map(({ itemInfo }) => (
            <ItemBox key={itemInfo.id}>
              <ImageInput
                type="checkbox"
                id={String(itemInfo.id)}
                onChange={() => handleClick({ id: itemInfo.id, src: itemInfo.image })}
              />
              <ImageLabel htmlFor={String(itemInfo.id)}>
                <CommonImage size="sm" src={itemInfo.image} />
              </ImageLabel>
              <CommonText type="normalInfo">{formatNumber(itemInfo.price)}</CommonText>
              <CommonText type="smallInfo">{itemInfo.name}</CommonText>
            </ItemBox>
          ))}
        </ItemsWrapper>
        {items.totalCount === 0 && (
          <>
            <CommonDivider size="sm" />
            <div>
              <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
              <Container>
                <CommonButton type="text" onClick={() => navigate('/item')}>
                  아이템 추가하러가기
                </CommonButton>
                <CommonIcon type="chevronRight" />
              </Container>
            </div>
          </>
        )}
      </Body>
    </>
  );
};

export default BucketSelectItem;
