import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, Header, Footer } from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  CommonContainer,
  TitleContainer,
  ItemTextContaienr,
  ItemListContainer,
  AddContainer,
} from './style';
import { ListItem } from '@/features/item/components';
import { GetMyItemsResponse, itemQueryOption } from '@/features/item/service';

const ItemList = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const { data, isPending, isError } = useQuery({
    ...itemQueryOption.myItems({ cursorId: '', size: 10 }),
  });

  const [itemData, setItemData] = useState<GetMyItemsResponse['summaries']>([]);

  const authNavigate = useAuthNavigate();

  const handleClick = (deleteId: number) => {
    const filterData = itemData.filter(({ itemInfo: { id } }) => id !== deleteId);
    setItemData(filterData);
  };

  useEffect(() => {
    if (data) {
      setItemData([...data.summaries]);
    }
  }, [data]);

  if (isPending) {
    return <>Loading..</>;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <>
      <Header type="logo" />
      <CommonContainer>
        <TitleContainer>
          <CommonText type="smallTitle">내 아이템 전체보기</CommonText>
          {isDelete ? (
            <CommonIconButton type="cancel" onClick={() => setIsDelete((prev) => !prev)} />
          ) : (
            <CommonIconButton type="delete" onClick={() => setIsDelete((prev) => !prev)} />
          )}
        </TitleContainer>
        <ItemTextContaienr>
          <CommonText type="smallInfo">총 {formatNumber(data.totalCount)}개의 아이템</CommonText>
        </ItemTextContaienr>
        <ItemListContainer>
          {itemData.map(({ itemInfo: { id, image, name, price } }) => (
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
