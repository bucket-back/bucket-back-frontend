import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDrawer, CommonImage, CommonMenu, CommonText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { Container, ContentWrapper, Grid, GridItem, TitleWrapper } from './style';
import { useHobby } from '@/features/hobby/hooks';
import InventorySelectItem from '@/features/inventory/components/InventorySelectItem';
import { useUpdateInventory } from '@/features/inventory/hook';
import useDeleteInventory from '@/features/inventory/hook/useDeleteInventory';
import { SelectedItem, inventoryQueryOption } from '@/features/inventory/service';

const InventoryDetail = () => {
  const { nickname, inventoryId } = useParams() as { nickname: string; inventoryId: string };
  const numberInventoryId = Number(inventoryId);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { isOpen, onOpen, onClose } = useDrawer();
  const { data: hobbyData } = useHobby();
  const { data: inventoryDetailData } = useQuery({
    ...inventoryQueryOption.detail({
      nickname: nickname,
      inventoryId: numberInventoryId,
    }),
  });
  const { mutate: deleteInventoryMutate } = useDeleteInventory();
  const currentHobby = hobbyData?.hobbies.find(({ value }) => value === inventoryDetailData?.hobby);
  const { mutate: updateInventoryMutate } = useUpdateInventory({
    nickname: nickname,
    inventoryId: numberInventoryId,
    hobbyName: String(currentHobby?.name),
  });

  const handleDeleteInventory = () => {
    // TODO: 정말 삭제할건지 모달띄워주기
    deleteInventoryMutate(numberInventoryId);
  };

  const onSubmit = () => {
    const itemIds = selectedItems.map((item) => item.id);
    const prevItemIds = inventoryDetailData?.inventoryItemInfos.map((item) => item.id);
    const isSameItems = JSON.stringify(prevItemIds) === JSON.stringify(itemIds);
    !isSameItems &&
      updateInventoryMutate({
        inventoryId: numberInventoryId,
        itemIds,
      });
  };

  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <CommonText type="normalTitle">{inventoryDetailData?.hobby} 인벤토리</CommonText>
          <CommonMenu
            type="update"
            iconSize="0.3rem"
            onDelete={handleDeleteInventory}
            onUpdate={() => {
              onOpen();
            }}
          />
        </TitleWrapper>
        <CommonText type="normalTitle">아이템 전체보기</CommonText>
        <ContentWrapper>
          <CommonText type="subStrongInfo">
            총 {inventoryDetailData?.itemCount}개의 아이템
          </CommonText>
        </ContentWrapper>

        <Grid>
          {inventoryDetailData?.inventoryItemInfos.map(({ image, name, price }, index) => (
            <GridItem key={index}>
              <CommonImage size="sm" src={image} />
              <CommonText type="smallInfo">{name}</CommonText>
              <CommonText type="smallInfo">{formatNumber(price)}</CommonText>
            </GridItem>
          ))}
        </Grid>
      </Container>
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
export default InventoryDetail;
