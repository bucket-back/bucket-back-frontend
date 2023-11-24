import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/shared/components';
import { Container, Wrapper, HeaderBox, SearchContainer } from './style';
import { SearchForm } from '@/features/search/components';
import { useLocalStorage } from '@/features/search/hooks';

const SearchHome = () => {
  const [isWord, setIsWord] = useState<boolean>(false);

  const [storageValue, setState] = useLocalStorage('search');

  const onStorage = (keyword: string) => {
    const findValue = storageValue.findIndex((value: string) => value === keyword);
    findValue >= -1 ? setState([...storageValue, keyword]) : setState([...storageValue]);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <HeaderBox />
          <SearchForm
            onStorage={(keyword) => onStorage(keyword)}
            onInput={(word) => (word && word.length >= 1 ? setIsWord(true) : setIsWord(false))}
          />
          <SearchContainer>
            <Outlet context={{ isWord, storageValue, setState }} />
          </SearchContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchHome;
