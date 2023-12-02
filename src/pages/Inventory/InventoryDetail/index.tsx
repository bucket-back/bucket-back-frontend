import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonImage, CommonMenu, CommonText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { Storage } from '@/shared/utils';
import { Container, ContentWrapper, Grid, GridItem, TitleWrapper } from './style';
import UpdateInventoryDetail from '@/features/inventory/components/ UpdateInventoryDetail';
import DeleteInventoryDetail from '@/features/inventory/components/DeleteInventoryDetail';
import { inventoryQueryOption } from '@/features/inventory/service';

const InventoryDetail = () => {
  const { nickname, inventoryId } = useParams() as { nickname: string; inventoryId: string };
  const numberInventoryId = Number(inventoryId);
  const { isOpen, onOpen, onClose } = useDrawer();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDrawer();
  const navigate = useNavigate();
  const isOwner = nickname === Storage.getLocalStoraged('userInfo').nickname;
  const { data: inventoryDetailData } = useQuery({
    ...inventoryQueryOption.detail({
      nickname: nickname,
      inventoryId: numberInventoryId,
    }),
  });

  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <CommonText type="normalTitle">{inventoryDetailData?.hobby} 인벤토리</CommonText>
          {isOwner && (
            <CommonMenu type="update" iconSize="0.3rem" onDelete={onDeleteOpen} onUpdate={onOpen} />
          )}
        </TitleWrapper>
        <CommonText type="normalTitle">아이템 전체보기</CommonText>
        <ContentWrapper>
          <CommonText type="subStrongInfo">
            총 {inventoryDetailData?.itemCount}개의 아이템
          </CommonText>
        </ContentWrapper>

        <Grid>
          {inventoryDetailData?.inventoryItemInfos.map(({ image, name, price, id }, index) => (
            <GridItem key={index} onClick={() => navigate(`/item/${id}`)}>
              <CommonImage size="sm" src={image} border="1px solid #e2e8f0 " />
              <CommonText type="smallInfo">{name}</CommonText>
              <CommonText type="smallInfo">{formatNumber(price)}</CommonText>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <UpdateInventoryDetail
        isOpen={isOpen}
        onClose={onClose}
        inventoryItemInfos={inventoryDetailData?.inventoryItemInfos || []}
        inventoryHobby={inventoryDetailData?.hobby || ''}
      />
      <DeleteInventoryDetail isOpen={isDeleteOpen} onClose={onDeleteClose} />
    </>
  );
};
export default InventoryDetail;
