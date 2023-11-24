import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/shared/components';
import { Container, Wrapper, HeaderBox, SearchContainer } from './style';
import { SearchForm } from '@/features/search/components';

const SearchHome = () => {
  const [isWord, setIsWord] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Wrapper>
          <HeaderBox />
          <SearchForm
            onInput={(word) => (word && word.length >= 1 ? setIsWord(true) : setIsWord(false))}
          />
          <SearchContainer>
            <Outlet context={isWord} />
          </SearchContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchHome;
