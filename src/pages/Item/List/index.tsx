import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, Header, Footer } from '@/shared/components';
import { useAuthNavigate, useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  CommonContainer,
  TitleContainer,
  ItemTextContaienr,
  AddContainer,
  Grid,
  ButtonBox,
} from './style';
import { ListItem } from '@/features/item/components';
import { useDeleteItem } from '@/features/item/hooks';
import { itemQueryOption } from '@/features/item/service';

const ItemList = () => {
  const [deleteData, setDeleteData] = useState<number[]>([]);

  const [isDelete, setIsDelete] = useState<boolean>(false);

  const authNavigate = useAuthNavigate();

  const {
    mutate: itemMutate,
    isError: itemDeleteError,
    isPending: itemDeletePending,
  } = useDeleteItem({ cursorId: '', size: 3 });

  const { data, hasNextPage, fetchNextPage, isPending, isError } = useInfiniteQuery({
    ...itemQueryOption.infinityList({ size: 13 }),
    select: (data) => {
      return {
        summaries: data.pages.flatMap(({ summaries }) => summaries),
        totalCount: data.pages.flatMap(({ totalCount }) => totalCount),
      };
    },
  });

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  const handleChange = (deleteId: number) => {
    if (!deleteData.includes(deleteId)) {
      setDeleteData((prev) => [...prev, deleteId]);
    } else {
      setDeleteData((prev) => [...prev.filter((id) => id !== deleteId)]);
    }
  };

  const handleClick = () => {
    setDeleteData([]);
    setIsDelete((prev) => !prev);
  };

  const handleDeleteClick = () => {
    if (deleteData.length !== 0) {
      itemMutate({ itemIds: deleteData.join(',') });
    }
    handleClick();
  };

  if (isPending || itemDeletePending) {
    return <>Loading..</>;
  }

  if (isError || itemDeleteError) {
    return <>Error...</>;
  }

  const totalCount = data.totalCount.reduce((prev, next) => prev + next, 0);

  return (
    <>
      <Header type="logo" />
      <CommonContainer>
        <TitleContainer>
          <CommonText type="smallTitle">내 아이템{isDelete ? ' 삭제하기' : ' 전체보기'}</CommonText>
          {isDelete ? (
            <ButtonBox>
              <CommonIconButton type="cancel" onClick={handleClick} />
              <CommonIconButton type="delete" onClick={handleDeleteClick} />
            </ButtonBox>
          ) : (
            <CommonIconButton type="delete" onClick={() => setIsDelete((prev) => !prev)} />
          )}
        </TitleContainer>
        <ItemTextContaienr>
          <CommonText type="smallInfo">
            {isDelete
              ? `총 삭제할 ${formatNumber(deleteData.length)}개의 아이템`
              : `총 ${formatNumber(totalCount)}개의 아이템`}
          </CommonText>
        </ItemTextContaienr>
        <Grid>
          <>
            {data.summaries.map(({ itemInfo: { id, image, name, price } }) => (
              <ListItem
                key={id}
                id={id}
                image={image}
                price={price}
                name={name}
                isDelete={isDelete}
                isDeleteMode={deleteData.includes(id)}
                handleChange={handleChange}
              />
            ))}
            {hasNextPage && <div ref={ref} />}
          </>
        </Grid>
      </CommonContainer>
      <Footer>
        <AddContainer>
          <CommonIconButton type="add" onClick={() => authNavigate('create')} />
        </AddContainer>
      </Footer>
    </>
  );
};

export default ItemList;
