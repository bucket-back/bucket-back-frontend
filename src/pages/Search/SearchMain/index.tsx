import { useOutletContext } from 'react-router-dom';
import { Container } from './style';
import { LatelySearch, SearchList } from '@/features/search/components';

const SearchMain = () => {
  const keyword = useOutletContext<string>();

  const isWord = !keyword || keyword.length <= 0;

  return isWord ? (
    <Container>
      <LatelySearch />
    </Container>
  ) : (
    <SearchList keyword={keyword} />
  );
};

export default SearchMain;
