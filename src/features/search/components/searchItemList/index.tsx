import { useNavigate } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import { Wrapper, Box, TextBox, NoResult } from './style';
import { searchQueryOption } from '@/features/search/service';
import { SearchListProps } from '@/pages/Search/SearchMain';

export interface SearchListItemProp {
  keyword: SearchListProps['keyword'];
}

const SearchItemList = ({ keyword }: SearchListItemProp) => {
  const { data, isPending, isError } = useQuery({
    ...searchQueryOption.itemList({ keyword, size: 10 }),
  });

  const navigate = useNavigate();

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error...</>;
  }

  return data.totalCount >= 1 ? (
    <>
      <Box>
        <TextBox>
          <CommonText type="subStrongInfo">총 {data.totalCount}개의 아이템</CommonText>
        </TextBox>
        <Grid padding="0 1rem" templateColumns="repeat(3,1fr)" gap="0.25rem">
          {data.items.map(({ itemSummary }) => (
            <GridItem key={itemSummary.id} onClick={() => navigate(`/item/${itemSummary.id}`)}>
              <CommonImage size="sm" src={itemSummary.image} />
              <CommonText type="normalInfo">{formatNumber(itemSummary.price)}원</CommonText>
              <CommonText type="smallInfo">{itemSummary.name}</CommonText>
            </GridItem>
          ))}
        </Grid>
        <CommonDivider size="sm" />
        <div>
          <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
          <Wrapper onClick={() => navigate('/item/create')}>
            <CommonButton type="text">아이템 추가하러가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Box>
    </>
  ) : (
    <NoResult>검색결과가 없습니다.</NoResult>
  );
};

export default SearchItemList;
