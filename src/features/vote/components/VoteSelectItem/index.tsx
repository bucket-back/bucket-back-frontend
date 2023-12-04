import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { Container, Grid, GridItem, ImageInput, ImageLabel, Wrapper } from './style';
import { SelectedItem } from '@/features/inventory/service';
import { itemQueryOption } from '@/features/item/service';

interface VoteSelectItemProps {
  selectedItems: SelectedItem[];
  onChange: Dispatch<SetStateAction<SelectedItem[]>>;
  selectedHobby: string;
}

const VoteSelectItem = ({ selectedItems, onChange, selectedHobby }: VoteSelectItemProps) => {
  const navigate = useNavigate();
  const { data: myItemsData, fetchNextPage } = useInfiniteQuery({
    ...itemQueryOption.infinityList({
      hobbyName: selectedHobby,
      size: 12,
    }),
    select: (data) => {
      return {
        totalMemberItemCount: data?.pages[0].totalMemberItemCount,
        summaries: data?.pages.flatMap(({ summaries }) => summaries),
      };
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, src: string) => {
    const checked = e.target.checked;
    if (checked && selectedItems.length <= 1) {
      onChange(() => [...selectedItems, { id: Number(e.target.id), src: src }]);
    } else if (!checked) {
      onChange(selectedItems.filter(({ id }) => id !== Number(e.target.id)));
    }
    if (selectedItems.length > 1) {
      e.target.checked = false;
    }
  };

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  return (
    <>
      <Container>
        <CommonText type="normalTitle">투표 아이템 선택</CommonText>
        <CommonText type="subStrongInfo">
          총 {myItemsData?.totalMemberItemCount}개의 아이템
        </CommonText>
        <Grid>
          {myItemsData?.summaries.map(({ itemInfo }) => (
            <GridItem key={itemInfo.id}>
              <ImageInput
                type="checkbox"
                id={String(itemInfo.id)}
                onChange={(e) => handleChange(e, itemInfo.image)}
              />

              <ImageLabel htmlFor={String(itemInfo.id)}>
                <CommonImage size="sm" src={itemInfo.image} />
              </ImageLabel>
              <CommonText type="normalInfo">{formatNumber(itemInfo.price)}</CommonText>
              <CommonText type="smallInfo">{itemInfo.name}</CommonText>
            </GridItem>
          ))}
        </Grid>
        <div ref={ref} />
        <CommonDivider size="sm" />
        <div>
          <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
          <Wrapper>
            <CommonButton type="text" onClick={() => navigate('/item/create')}>
              아이템 추가하러가기
            </CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Container>
    </>
  );
};

export default VoteSelectItem;
