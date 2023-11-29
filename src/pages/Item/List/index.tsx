import { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, Header, Footer, CommonImage } from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
import { ellipsisName, formatNumber } from '@/shared/utils';
import { CommonContainer, TitleContainer, ItemTextContaienr, AddContainer } from './style';
import { ListItem } from '@/features/item/components';
import { useDeleteItem } from '@/features/item/hooks';
import { itemQueryOption } from '@/features/item/service';
import { COMMON } from '@/shared/styles/Common';

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
      console.log(deleteData);
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
              <CommonIconButton type="cancel" onClick={() => setIsDelete((prev) => !prev)} />
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
          {data.summaries.map(({ itemInfo: { id, image, name, price } }) =>
            isDelete ? (
              <GridItem key={id}>
                <ImageInput type="checkbox" id={String(id)} onChange={() => handleChange(id)} />
                <ImageLabel htmlFor={String(id)}>
                  <CommonImage size="sm" src={image} />
                </ImageLabel>
                <CommonText type="normalInfo">{formatNumber(price)}</CommonText>
                <CommonText type="smallInfo" noOfLines={0}>
                  {ellipsisName(name, 20)}
                </CommonText>
              </GridItem>
            ) : (
              <ListItem
                key={id}
                id={id}
                image={image}
                price={price}
                name={name}
                isDelete={isDelete}
              />
            )
          )}
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

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(6rem, 1fr));
  gap: 0.5rem;
`;

export const GridItem = styled.div`
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageLabel = styled.label`
  position: relative;
  &::before {
    content: '✓';
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    background-color: ${COMMON.COLORS.MAIN_COLOR};
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    transition-duration: 0.4s;
    transform: scale(0);
    z-index: 999;
  }

  input:checked + &::before {
    transform: scale(1);
  }
`;
