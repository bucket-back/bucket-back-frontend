import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonButton, CommonIcon, CommonImage, CommonText } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { SelectedItem, inventoryQueryOption } from '../../service';
import { Container, Grid, GridItem, ImageInput, ImageLabel, Wrapper } from './style';

interface InventorySelectItemProps {
  selectedItems: SelectedItem[];
  onChange: Dispatch<SetStateAction<SelectedItem[]>>;
  selectedHobby: string;
  inventoryId?: string;
}

const InventorySelectItem = ({
  onChange,
  selectedItems,
  selectedHobby,
  inventoryId,
}: InventorySelectItemProps) => {
  const navigate = useNavigate();
  const { data: myItemsData, fetchNextPage } = useInfiniteQuery({
    ...inventoryQueryOption.myItems({
      hobbyName: selectedHobby,
      inventoryId: Number(inventoryId),
      size: 12,
    }),
    select: (data) => data.pages.flatMap(({ reviewedItems }) => reviewedItems),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, src: string) => {
    const checked = e.target.checked;
    checked
      ? onChange(() => [...selectedItems, { id: Number(e.target.id), src }])
      : onChange(selectedItems.filter(({ id }) => id !== Number(e.target.id)));
  };

  const updatedItems = useMemo(
    () =>
      myItemsData
        ?.filter((item) => item.isSelected)
        .map((item) => {
          return { id: item.itemInfo.id, src: item.itemInfo.image };
        }) || [],
    [myItemsData]
  );

  useEffect(() => {
    onChange(() => updatedItems);
  }, [onChange, updatedItems]);

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  return (
    <>
      <Container>
        <CommonText type="normalTitle">인벤토리 아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총{myItemsData?.length}개의 아이템</CommonText>
        <Grid>
          {myItemsData?.map(({ itemInfo, isSelected }) => (
            <GridItem key={itemInfo.id}>
              <ImageInput
                type="checkbox"
                id={String(itemInfo.id)}
                defaultChecked={isSelected}
                onChange={(e) => handleChange(e, itemInfo.image)}
              />
              <ImageLabel htmlFor={String(itemInfo.id)}>
                <CommonImage size="sm" src={itemInfo.image} border="1px solid #e2e8f0 " />
              </ImageLabel>
              <CommonText type="smallInfo">{formatNumber(itemInfo.price)}</CommonText>
              <CommonText type="smallInfo">{itemInfo.name}</CommonText>
            </GridItem>
          ))}
        </Grid>
        <div ref={ref} />

        <div>
          <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
          <Wrapper>
            <CommonButton type="text" onClick={() => navigate('/item/create')}>
              아이템 추가하러가기
            </CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Container>
    </>
  );
};

export default InventorySelectItem;
