import { ChangeEvent } from 'react';
import { CommonButton, CommonIcon, CommonImage, CommonText } from '@/shared/components';
import { Container, Grid, GridItem, ImageInput, ImageLabel, Wrapper } from './style';
import { reviewedItem } from '@/shared/types/inventory';

interface InventorySelectItemProps {
  reviewedItems?: reviewedItem[];
  onChange: (e: ChangeEvent<HTMLInputElement>, src: string) => void;
}

const InventorySelectItem = ({ reviewedItems, onChange }: InventorySelectItemProps) => {
  return (
    <>
      <Container>
        <CommonText type="normalTitle">인벤토리 아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총{reviewedItems?.length}개의 아이템</CommonText>
        <Grid>
          {reviewedItems?.map(({ itemInfo }) => (
            <GridItem key={itemInfo.id}>
              <ImageInput
                type="checkbox"
                id={String(itemInfo.id)}
                onChange={(e) => onChange(e, itemInfo.image)}
              />
              <ImageLabel htmlFor={String(itemInfo.id)}>
                <CommonImage size="sm" src={itemInfo.image} />
              </ImageLabel>
              <CommonText type="smallInfo">{itemInfo.price}</CommonText>
              <CommonText type="smallInfo">{itemInfo.name}</CommonText>
            </GridItem>
          ))}
        </Grid>

        <div>
          <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
          <Wrapper>
            <CommonButton type="text">아이템 추가하러가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Container>
    </>
  );
};

export default InventorySelectItem;
