import { CommonImage, CommonMenu, CommonText, Header } from '@/shared/components';
import { Container, ContentWrapper, Grid, GridItem, TitleWrapper } from './style';

const InventoryCreate = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <CommonText type="normalTitle">자전거 인벤토리</CommonText>
          <CommonMenu type="update" iconSize="0.3rem" onDelete={() => {}} />
        </TitleWrapper>
        <CommonText type="normalTitle">아이템 전체보기</CommonText>
        <ContentWrapper>
          <CommonText type="subStrongInfo">총 0개의 아이템</CommonText>
        </ContentWrapper>

        <Grid>
          {Array.from({ length: 6 }, (_, index) => {
            return (
              <GridItem key={index}>
                <CommonImage size="sm" />
                <CommonText type="smallInfo">자전거</CommonText>
                <CommonText type="smallInfo">29,800</CommonText>
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};
export default InventoryCreate;
