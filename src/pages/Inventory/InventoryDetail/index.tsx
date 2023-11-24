import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDrawer, CommonImage, CommonMenu, CommonText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Container, ContentWrapper, Grid, GridItem, TitleWrapper } from './style';
import { useHobby } from '@/features/hobby/hooks';
import InventorySelectItem from '@/features/inventory/components/InventorySelectItem';
import { useUpdateInventory } from '@/features/inventory/hook';
import useDeleteInventory from '@/features/inventory/hook/useDeleteInventory';
import { inventoryQueryOption } from '@/features/inventory/service';

interface SelectedItem {
  id: string;
  src: string;
}

const InventoryDetail = () => {
  const { nickname, inventoryId } = useParams();
  const { data: hobbyData } = useHobby();
  const { data: inventoryDetailData } = useQuery({
    ...inventoryQueryOption.detail({
      nickname: String(nickname),
      inventoryId: Number(inventoryId),
    }),
  });
  const { mutate: deleteInventoryMutate } = useDeleteInventory();
  const currentHobby = hobbyData?.hobbies.find(({ value }) => value === inventoryDetailData?.hobby);
  const { data: myItemsData } = useQuery({
    ...inventoryQueryOption.myItems({
      hobbyName: currentHobby?.name,
      inventoryId: Number(inventoryId),
    }),
  });
  const { mutate: updateInventoryMutate } = useUpdateInventory({
    nickname: String(nickname),
    inventoryId: Number(inventoryId),
  });
  const updatedItems =
    myItemsData?.reviewedItems
      .filter((item) => item.isSelected)
      .map((item) => {
        return { id: String(item.itemInfo.id), src: item.itemInfo.image };
      }) || [];
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const { isOpen, onOpen, onClose } = useDrawer();

  const handleDeleteInventory = () => {
    // TODO : 정말 삭제할건지 모달띄워주기
    deleteInventoryMutate(Number(inventoryId));
  };

  const checkingItems = (e: ChangeEvent<HTMLInputElement>, src: string) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedItems(() => [...selectedItems, { id: e.target.id, src: src }]);
    } else if (!checked) {
      setSelectedItems(selectedItems.filter(({ id }) => id !== e.target.id));
    }
  };

  const onSubmit = () => {
    const itemIds = selectedItems.map((item) => Number(item.id));
    updateInventoryMutate({
      inventoryId: Number(inventoryId),
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
              setSelectedItems([...updatedItems]);
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
              <CommonText type="smallInfo">{price}</CommonText>
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
        <InventorySelectItem reviewedItems={myItemsData?.reviewedItems} onChange={checkingItems} />
      </CommonDrawer>
    </>
  );
};
export default InventoryDetail;
