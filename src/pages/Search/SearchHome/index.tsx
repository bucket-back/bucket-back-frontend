import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/shared/components';
import { Container, Wrapper, HeaderBox, SearchContainer } from './style';
import { SearchForm } from '@/features/search/components';

const SearchHome = () => {
  const [keyword, setKeyword] = useState<string>('');

  const onInput = (word: string) => {
    setKeyword(word);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <HeaderBox />
          <SearchForm keyword={keyword} onInput={onInput} />
          <SearchContainer>
            <Outlet context={{ keyword, onInput }} />
          </SearchContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchHome;
