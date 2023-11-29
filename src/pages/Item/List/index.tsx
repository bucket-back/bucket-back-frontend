import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, Header, Footer } from '@/shared/components';
import { useAuthNavigate, useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  CommonContainer,
  TitleContainer,
  ItemTextContaienr,
  ItemListContainer,
  AddContainer,
} from './style';
import { ListItem } from '@/features/item/components';
import { useDeleteItem } from '@/features/item/hooks';
import { GetMyItemsResponse, itemQueryOption } from '@/features/item/service';

const ItemList = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const {
    mutate: itemMutate,
    isError: itemDeleteError,
    isPending: itemDeletePending,
  } = useDeleteItem({ cursorId: '', size: 10 });

  const [itemData, setItemData] = useState<GetMyItemsResponse['summaries']>([]);

  const [deleteData, setDeleteData] = useState<number[]>([]);

  const authNavigate = useAuthNavigate();

  const {
    data: testData,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    ...itemQueryOption.infinityList({ size: 3 }),
  });

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  const handleClick = (deleteId: number) => {
    const filterData = itemData.filter(({ itemInfo: { id } }) => id !== deleteId);
    setItemData(filterData);
    setDeleteData((prev) => [...prev, deleteId]);
  };

  const handleDeleteClick = () => {
    if (deleteData.length !== 0) {
      itemMutate({ itemIds: deleteData.join(',') });
    }
    setIsDelete((prev) => !prev);
  };

  useEffect(() => {
    if (testData?.pages[0].summaries) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      setItemData([...testData?.pages[0].summaries]);
    }
  }, [testData?.pages[0]]);

  if (isPending || itemDeletePending) {
    return <>Loading..</>;
  }

  if (isError || itemDeleteError) {
    return <>Error...</>;
  }

  return (
    <>
      <Header type="logo" />
      <CommonContainer>
        <TitleContainer>
          <CommonText type="smallTitle">내 아이템 전체보기</CommonText>
          {isDelete ? (
            <CommonIconButton type="cancel" onClick={handleDeleteClick} />
          ) : (
            <CommonIconButton type="delete" onClick={() => setIsDelete((prev) => !prev)} />
          )}
        </TitleContainer>
        <ItemTextContaienr>
          <CommonText type="smallInfo">
            {isDelete
              ? `총 삭제할 ${formatNumber(deleteData.length)}개의 아이템`
              : `총 ${formatNumber(testData?.pages[0].totalCount)}개의 아이템`}
          </CommonText>
        </ItemTextContaienr>
        <ItemListContainer>
          <>
            {testData.pages[0].summaries.map(({ itemInfo: { id, image, name, price } }) => (
              <ListItem
                key={id}
                id={id}
                image={image}
                price={price}
                name={name}
                isDelete={isDelete}
                onClick={isDelete ? handleClick : undefined}
              />
            ))}
            {hasNextPage && <Obverser ref={ref} />}
          </>
        </ItemListContainer>
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

const Obverser = styled.div`
  height: 1rem;
`;
