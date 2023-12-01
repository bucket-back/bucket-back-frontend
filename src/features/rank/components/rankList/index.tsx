import { CommonText } from '@/shared/components';
import { WrapperTitle, Grid, GridItemList } from './style';

const RankList = () => {
  const today = new Date();

  return (
    <>
      <WrapperTitle>
        <CommonText type="normalInfo">인기 아이템</CommonText>
        <CommonText type="smallInfo">
          {today.toLocaleDateString('ko-kr', {
            month: 'long',
            day: 'numeric',
            // timeZone: 'number',
          })}
          기준
        </CommonText>
      </WrapperTitle>
      <Grid>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
        <GridItemList>
          <CommonText type="smallInfo">인기 아이템</CommonText>
        </GridItemList>
      </Grid>
    </>
  );
};

export default RankList;
