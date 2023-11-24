import { useNavigate } from 'react-router-dom';
import { CommonText, CommonButton, CommonTag } from '@/shared/components';
import { SEARCH_KEY } from '@/shared/constants';
import { WrapperTitle, WrapperContent, KeywordBox } from './style';
import { useSearchedKeywordStorage } from '@/features/search/hooks';

// TODO:input에 검색어가 없을시
// 1. localstorage에 저장되어 있는 최근 검색어 보여주기 (O)
// 2. 모두 지우기 기능 (O)
// 3. 하나씩 지우기 기능 (O)
// 4. 클릭시 이동 기능
// 5. 추가하기 기능

const LatelySearch = () => {
  const navigate = useNavigate();

  const [storageValue, setState] = useSearchedKeywordStorage(SEARCH_KEY);

  return (
    <>
      <WrapperTitle>
        <CommonText type="normalInfo">최근 검색어</CommonText>
        <CommonButton
          type="xsText"
          onClick={() => {
            setState([]);
          }}
        >
          모두 지우기
        </CommonButton>
      </WrapperTitle>
      <WrapperContent>
        {storageValue.length > 0 &&
          storageValue.map((value: string, index: number) => (
            <KeywordBox key={index}>
              <CommonTag
                type="search"
                onClick={() => navigate('result')}
                onDelete={() => {
                  const filterData = storageValue.filter((keyword: string) => value !== keyword);
                  setState([...filterData]);
                }}
              >
                {value}
              </CommonTag>
            </KeywordBox>
          ))}
      </WrapperContent>
    </>
  );
};

export default LatelySearch;
