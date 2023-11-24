import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDivider, CommonIcon, CommonText } from '@/shared/components';
import { WordWrapper } from './style';
import { searchQueryOption } from '@/features/search/service';

interface SearchListProps {
  keyword: string;
}

const SearchList = ({ keyword }: SearchListProps) => {
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({ ...searchQueryOption.keywordList(keyword) });

  if (isPending) {
    return <>Loading..</>;
  }

  if (isError) {
    return <>Error</>;
  }

  return (
    <>
      {data.itemNameGetResults.map(({ itemId, itemName }) => (
        <Fragment key={itemId}>
          <WordWrapper onClick={() => navigate(`/item/${itemId}`)}>
            <CommonIcon type="search" />
            <CommonText type="normalInfo">{itemName}</CommonText>
          </WordWrapper>
          <CommonDivider size="sm" />
        </Fragment>
      ))}
    </>
  );
};

export default SearchList;
