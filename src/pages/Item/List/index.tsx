import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonIconButton, CommonText, Header, Footer } from '@/shared/components';
import { ItemSummary } from '@/shared/types';
import { formatNumber } from '@/shared/utils';
import {
  CommonContainer,
  TitleContainer,
  ItemTextContaienr,
  ItemListContainer,
  AddContainer,
} from './style';
import { ListItem } from '@/features/item/components';

const ItemList = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [data, setData] = useState<ItemSummary[]>([]);
  const navigate = useNavigate();
  const handleClick = (deleteId: number) => {
    const filterData = data.filter(({ id }) => id !== deleteId);
    setData(filterData);
  };

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
          <CommonText type="smallInfo">총 {formatNumber(data.length)}개의 아이템</CommonText>
        </ItemTextContaienr>
        <ItemListContainer>
          {data.map(({ id, image, name, price }) => (
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
          <CommonIconButton type="add" onClick={() => navigate('create')} />
        </AddContainer>
      </Footer>
    </>
  );
};

export default ItemList;
