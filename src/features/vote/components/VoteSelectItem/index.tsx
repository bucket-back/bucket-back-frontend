import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { MyItems } from '@/shared/types';
import { Container, Grid, GridItem, Wrapper } from './style';

interface VoteSelectItemProps {
  onClick: (index: number) => void;
  myItemsData: MyItems;
}

const VoteSelectItem = ({ onClick, myItemsData }: VoteSelectItemProps) => {
  return (
    <>
      <Container>
        <CommonText type="normalTitle">투표 아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총 {myItemsData.totalCount}개의 아이템</CommonText>
        <Grid>
          {myItemsData.summaries.map(({ itemInfo }) => (
            <GridItem key={itemInfo.id}>
              <CommonImage size="sm" src={itemInfo.image} onClick={() => onClick(itemInfo.id)} />
              <CommonText type="normalInfo">{itemInfo.price}</CommonText>
              <CommonText type="smallInfo">{itemInfo.name}</CommonText>
            </GridItem>
          ))}
        </Grid>
        <CommonDivider size="sm" />
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

export default VoteSelectItem;
