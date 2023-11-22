import styled from '@emotion/styled';
import { CommonIconButton, CommonText, DividerImage, Header } from '@/shared/components';

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

export const Container = styled.main`
  padding: 0 2.44rem 2.44rem 2.44rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AddButtonWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  right: 20px;
  z-index: 10;
`;
