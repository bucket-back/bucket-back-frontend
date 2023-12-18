import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, DividerImage, Header } from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { Storage } from '@/shared/utils';
import { AddButtonWrapper, Container, Grid, GridItem, TextBox } from './style';
import { inventoryQueryOption } from '@/features/inventory/service';

const InventoryHome = () => {
  const authNavigate = useAuthNavigate();
  const navigate = useNavigate();
  const { nickname } = useParams();
  const { data: inventoryData } = useQuery({
    ...inventoryQueryOption.list(nickname!),
    staleTime: Infinity,
  });
  const isOwner = nickname === Storage.getLocalStoraged('userInfo').nickname;

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">인벤토리</CommonText>
        <CommonText type="subStrongInfo">
          총 {inventoryData?.inventoryInfos.length}개의 인벤토리
        </CommonText>
        <Grid>
          {inventoryData?.inventoryInfos.map((inventory, index) => {
            return (
              <GridItem
                key={index}
                onClick={() => navigate(`/member/${nickname}/inventory/${inventory.inventoryId}`)}
              >
                <DividerImage
                  images={inventory.itemImages.map(({ imgUrl }) => imgUrl)}
                  type="base"
                />
                <TextBox>
                  <CommonText type="smallInfo">{inventory.hobby}</CommonText>
                  <CommonText type="smallInfo">
                    {formatNumber(inventory.inventoryTotalPrice)}
                  </CommonText>
                </TextBox>
              </GridItem>
            );
          })}
        </Grid>
      </Container>
      <AddButtonWrapper>
        {isOwner && (
          <CommonIconButton
            type="create"
            onClick={() => {
              authNavigate('/inventory/create');
            }}
          />
        )}
      </AddButtonWrapper>
    </>
  );
};
export default InventoryHome;
