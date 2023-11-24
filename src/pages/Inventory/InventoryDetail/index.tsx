import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonImage, CommonMenu, CommonText, Header } from '@/shared/components';
import { Container, ContentWrapper, Grid, GridItem, TitleWrapper } from './style';
import useDeleteInventory from '@/features/inventory/hook/useDeleteInventory';
import { inventoryQueryOption } from '@/features/inventory/service';

const InventoryDetail = () => {
  const { nickname, inventoryId } = useParams();
  const { data: inventoryDetailData } = useQuery({
    ...inventoryQueryOption.detail({
      nickname: String(nickname),
      inventoryId: Number(inventoryId),
    }),
  });
  const { mutate: deleteInventoryMutate } = useDeleteInventory();
  const handleDeleteInventory = () => {
    // TODO : 정말 삭제할건지 모달띄워주기
    deleteInventoryMutate(Number(inventoryId));
  };

  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <CommonText type="normalTitle">{inventoryDetailData?.hobby} 인벤토리</CommonText>
          <CommonMenu type="update" iconSize="0.3rem" onDelete={handleDeleteInventory} />
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
    </>
  );
};
export default InventoryDetail;
