import { Box, Grid, GridItem } from '@chakra-ui/react';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { Body, Container } from './style';

interface VoteSelectItemProps {
  onClick: (index: number) => void;
}

const VoteSelectItem = ({ onClick }: VoteSelectItemProps) => {
  return (
    <>
      <Body>
        <CommonText type="normalTitle">투표 아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총 00개의 아이템</CommonText>
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(3, 1fr)" gap="0.5rem">
          {Array.from({ length: 6 }, (_, index) => {
            return (
              <GridItem key={index} marginBottom="1rem">
                <CommonImage size="sm" onClick={() => onClick(index)} />
                <CommonText type="normalInfo">29,000</CommonText>
                <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
              </GridItem>
            );
          })}
        </Grid>
        <CommonDivider size="sm" />
        <Box>
          <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
          <Container>
            <CommonButton type="text">아이템 추가하러가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Container>
        </Box>
      </Body>
    </>
  );
};

export default VoteSelectItem;
