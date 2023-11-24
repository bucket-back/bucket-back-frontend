import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/shared/components';
import { Container, Wrapper, HeaderBox, SearchContainer } from './style';
import { SearchForm } from '@/features/search/components';

const SearchHome = () => {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <>
      <Container>
        <Wrapper>
          <HeaderBox />
          <SearchForm
            onInput={(word) => {
              setKeyword(word);
            }}
          />
          <SearchContainer>
            <Outlet context={keyword} />
          </SearchContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchHome;
