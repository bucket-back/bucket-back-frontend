import { useNavigate } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { Wrapper } from './style';

const SearchItemList = () => {
  const navigate = useNavigate();

  return (
    <>
      <CommonText type="subStrongInfo">총 0개의 아이템</CommonText>
      <Grid padding="0 1rem" templateColumns="repeat(3,1fr)" gap="0.25rem">
        <GridItem>
          <CommonImage size="sm" />
          <CommonText type="normalInfo">{23000}</CommonText>
          <CommonText type="smallInfo">아이템입니다...</CommonText>
        </GridItem>
        <GridItem>
          <CommonImage size="sm" />
          <CommonText type="normalInfo">{23000}</CommonText>
          <CommonText type="smallInfo">아이템입니다...</CommonText>
        </GridItem>
      </Grid>
      <CommonDivider size="sm" />
      <div>
        <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
        <Wrapper onClick={() => navigate('/item/create')}>
          <CommonButton type="text">아이템 추가하러가기</CommonButton>
          <CommonIcon type="chevronRight" />
        </Wrapper>
      </div>
    </>
  );
};

export default SearchItemList;
