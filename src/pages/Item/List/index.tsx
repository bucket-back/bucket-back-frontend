import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, Header, Footer } from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
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
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const { data, isPending, isError } = useQuery({
    ...itemQueryOption.myItems({ cursorId: '', size: 20 }),
  });

  const {
    mutate: itemMutate,
    isError: itemDeleteError,
    isPending: itemDeletePending,
  } = useDeleteItem({ cursorId: '', size: 10 });

  const [deleteData, setDeleteData] = useState<number[]>([]);

  const authNavigate = useAuthNavigate();

  const handleChange = (deleteId: number) => {
    if (!deleteData.includes(deleteId)) {
      setDeleteData((prev) => [...prev, deleteId]);
    } else {
      setDeleteData((prev) => [...prev.filter((id) => id !== deleteId)]);
    }
  };

  const handleDeleteClick = () => {
    if (deleteData.length !== 0) {
      itemMutate({ itemIds: deleteData.join(',') });
    }
    setDeleteData([]);
    setIsDelete((prev) => !prev);
  };

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
          <CommonText type="smallTitle">내 아이템{isDelete ? ' 삭제하기' : ' 전체보기'}</CommonText>
          {isDelete ? (
            <ButtonBox>
              <CommonIconButton
                type="cancel"
                onClick={() => {
                  setDeleteData([]);
                  setIsDelete((prev) => !prev);
                }}
              />
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
              : `총 ${formatNumber(data.totalCount)}개의 아이템`}
          </CommonText>
        </ItemTextContaienr>
        <Grid>
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
