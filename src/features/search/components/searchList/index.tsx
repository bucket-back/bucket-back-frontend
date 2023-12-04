import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDivider, CommonIcon, CommonSpinner, CommonText } from '@/shared/components';
import { WordWrapper, NoResult } from './style';
import { searchQueryOption, searchLocalStorage } from '@/features/search/service';
import { SearchListProps } from '@/pages/Search/SearchMain';

const SearchList = ({ keyword, onInput }: SearchListProps) => {
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    ...searchQueryOption.keywordList(encodeURIComponent(keyword)),
  });

  const handleClick = (itemName: string) => {
    onInput(itemName);
    searchLocalStorage(itemName);
    navigate(`result?keyword=${encodeURIComponent(itemName)}`);
  };

  if (isPending) {
    return (
      <NoResult>
        <CommonSpinner size="xl" />
      </NoResult>
    );
  }

  if (isError) {
    return <NoResult>Error...</NoResult>;
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
