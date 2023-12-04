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
import { Body, Container, ImageInput, ImageLabel, ItemBox, ItemsWrapper } from './style';
import { itemQueryOption } from '@/features/item/service';

interface SelectedItem {
  id: number;
  src: string;
}

interface BucketSelectItemPorps {
  hobby: string;
  onClick: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
}

const BucketSelectItem = ({ hobby, onClick }: BucketSelectItemPorps) => {
  const navigate = useNavigate();

  const items = useInfiniteQuery({
    ...itemQueryOption.infinityList({ hobbyName: hobby, size: 12 }),
    select: ({ pages }) => ({
      pages,
      totalMemberItemCount: pages[0].totalMemberItemCount,
    }),
  });

  const observedRef = useIntersectionObserver({ onObserve: items.fetchNextPage });

  const handleClick = ({ id, src }: SelectedItem) => {
    onClick((prev) => {
      if (prev.map((item) => item.id).includes(id)) {
        return prev.filter((item) => item.id !== id);
      }

      return [...prev, { id, src }];
    });
  };

  if (items.isPending) {
    return;
  }

  if (items.isError) {
    return;
  }

  return (
    <>
      <Body>
        <div>
          <CommonText type="normalTitle">아이템 선택</CommonText>
          <CommonText type="subStrongInfo">
            총 {items.data.totalMemberItemCount}개의 아이템
          </CommonText>
        </div>
        <ItemsWrapper>
          {items.data.pages.map((page) =>
            page.summaries.map(({ itemInfo }) => (
              <ItemBox key={itemInfo.id}>
                <ImageInput
                  type="checkbox"
                  id={String(itemInfo.id)}
                  onChange={() => handleClick({ id: itemInfo.id, src: itemInfo.image })}
                />
                <ImageLabel htmlFor={String(itemInfo.id)}>
                  <CommonImage size="sm" src={itemInfo.image} />
                </ImageLabel>
                <CommonText type="normalInfo">{formatNumber(itemInfo.price)}</CommonText>
                <CommonText type="smallInfo">{itemInfo.name}</CommonText>
              </ItemBox>
            ))
          )}
          {items.hasNextPage && <div ref={observedRef} />}
        </ItemsWrapper>
        {items.data.totalMemberItemCount === 0 && (
          <>
            <CommonDivider size="sm" />
            <div>
              <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
              <Container>
                <CommonButton type="text" onClick={() => navigate('/search')}>
                  아이템 추가하러가기
                </CommonButton>
                <CommonIcon type="chevronRight" />
              </Container>
            </div>
          </>
        )}
      </Body>
    </>
  );
};

export default BucketSelectItem;
