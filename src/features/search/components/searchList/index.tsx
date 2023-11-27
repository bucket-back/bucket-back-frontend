import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDivider, CommonIcon, CommonText } from '@/shared/components';
import { SEARCH_KEY } from '@/shared/constants';
import { Storage } from '@/shared/utils';
import { WordWrapper, NoResult } from './style';
import { searchQueryOption } from '@/features/search/service';
import { SearchListProps } from '@/pages/Search/SearchMain';

// TODO:
// 리크트 클릭시
// input창에 자동완성 -> 최상위에서 상태 관리 -> 변할시 input창 영향 + router 이동
//결과페이지로 이동!

const SearchList = ({ keyword, onInput }: SearchListProps) => {
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    ...searchQueryOption.keywordList(keyword),
  });

  const handleClick = (itemName: string) => {
    onInput(itemName);
    const value = Storage.getLocalStoraged(SEARCH_KEY);
    if (!Array.isArray(value)) {
      Storage.setLocalStoraged(SEARCH_KEY, [itemName]);

      return;
    }
    const findValue = value.findIndex((value: string) => value === itemName);
    if (findValue === -1) {
      Storage.setLocalStoraged(SEARCH_KEY, [...value, itemName]);
    } else {
      Storage.setLocalStoraged(SEARCH_KEY, [...value]);
    }
    navigate(`result`);
  };

  if (isPending) {
    return <>Loading..</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <>
      {data.itemNameGetResults.length ? (
        data.itemNameGetResults.map(({ itemId, itemName }) => (
          <Fragment key={itemId}>
            <WordWrapper onClick={() => handleClick(itemName)}>
              <CommonIcon type="search" />
              <CommonText type="normalInfo">{itemName}</CommonText>
            </WordWrapper>
            <CommonDivider size="sm" />
          </Fragment>
        ))
      ) : (
        <NoResult>검색결과가 없습니다...</NoResult>
      )}
    </>
  );
};

export default SearchList;
