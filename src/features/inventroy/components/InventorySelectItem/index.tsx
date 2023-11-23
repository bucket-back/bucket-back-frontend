import { CommonButton, CommonIcon, CommonImage, CommonText } from '@/shared/components';
import { Container, Grid, GridItem, Wrapper } from './style';

const InventorySelectItem = () => {
  return (
    <>
      <Container>
        <CommonText type="normalTitle">인벤토리 아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총00개의 아이템</CommonText>
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
