import { ChangeEvent } from 'react';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { MyItems } from '@/shared/types';
import { Container, Grid, GridItem, ImageInput, ImageLabel, Wrapper } from './style';

interface VoteSelectItemProps {
  myItemsData: MyItems;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const VoteSelectItem = ({ myItemsData, onChange }: VoteSelectItemProps) => {
  return (
    <>
      <Container>
        <CommonText type="normalTitle">투표 아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총 {myItemsData.totalCount}개의 아이템</CommonText>
        <Grid>
          {myItemsData.summaries.map(({ itemInfo }) => (
            <GridItem key={itemInfo.id}>
              <ImageInput type="checkbox" id={String(itemInfo.id)} onChange={(e) => onChange(e)} />

              <ImageLabel htmlFor={String(itemInfo.id)}>
                <CommonImage size="sm" src={itemInfo.image} />
              </ImageLabel>
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
