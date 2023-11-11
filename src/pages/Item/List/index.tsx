import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CommonIconButton, CommonText, Header, Footer } from '@/shared/components';
import { formatNumberWithCommas } from '@/shared/utils';
import {
  CommonContainer,
  TitleContainer,
  ItemTextContaienr,
  ItemListContainer,
  AddContainer,
} from './style';
import { ItemSummary, Item } from '@/core/mocks/handler/item';
import { ItemList } from '@/features/item/components';

interface itemProps {
  itemSummary: Item['itemSummary'];
}

const List = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [data, setData] = useState<ItemSummary[]>([]);
  const navigate = useNavigate();
  const handleClick = (deleteId: number) => {
    const filterData = data.filter(({ id }) => id !== deleteId);
    setData(filterData);
  };

  useEffect(() => {
    axios
      .get('/api/items/search?keyword="baseball"&cursorId="asdf"&size="3"')
      .then((res) => res.data.items.map(({ itemSummary }: itemProps) => itemSummary))
      .then((data) => setData(data));
  }, []);

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
          <CommonText type="smallInfo">
            총 {formatNumberWithCommas(data.length)}개의 아이템
          </CommonText>
        </ItemTextContaienr>
        <ItemListContainer>
          {data.map(({ id, image, name, price }) => (
            <ItemList
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
        <AddContainer>
          <CommonIconButton type="add" onClick={() => navigate('create')} />
        </AddContainer>
      </CommonContainer>
      <Footer />
    </>
  );
};

export default List;
