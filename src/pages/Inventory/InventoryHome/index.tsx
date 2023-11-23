import { CommonIconButton, CommonText, DividerImage, Header } from '@/shared/components';
import { AddButtonWrapper, Container, Grid, GridItem, TextBox } from './style';

const InventoryHome = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">인벤토리</CommonText>
        <CommonText type="subStrongInfo">총 00개의 인벤토리</CommonText>
        <Grid>
          {Array.from({ length: 6 }, (_, index) => {
            return (
              <GridItem key={index}>
                <DividerImage images={[]} type="base" />
                <TextBox>
                  <CommonText type="smallInfo">자전거</CommonText>
                  <CommonText type="smallInfo">29,800</CommonText>
                </TextBox>
              </GridItem>
            );
          })}
        </Grid>
      </Container>
      <AddButtonWrapper>
        <CommonIconButton type="add" onClick={() => {}} />
      </AddButtonWrapper>
    </>
  );
};
export default InventoryHome;
