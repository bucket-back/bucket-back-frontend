import { useOutletContext } from 'react-router-dom';
import { Container } from './style';
import { LatelySearch, SearchList } from '@/features/search/components';

export interface SearchListProps {
  keyword: string;
  onInput: (word: string) => void;
}

const SearchMain = () => {
  const { keyword, onInput } = useOutletContext<SearchListProps>();

  const isWord = !keyword || keyword.length <= 0;

  return isWord ? (
    <Container>
      <LatelySearch onInput={onInput} />
    </Container>
  ) : (
    <SearchList keyword={keyword} onInput={onInput} />
  );
};

export default SearchMain;
