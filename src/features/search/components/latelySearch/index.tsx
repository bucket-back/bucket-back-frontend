import { CommonText, CommonButton, CommonTag } from '@/shared/components';
import { SEARCH_KEY } from '@/shared/constants';
import { ellipsisName } from '@/shared/utils';
import { WrapperTitle, WrapperContent, KeywordBox } from './style';
import { useSearchedKeywordStorage } from '@/features/search/hooks';

// TODO:input에 검색어가 없을시
// 1. localstorage에 저장되어 있는 최근 검색어 보여주기 (O)
// 2. 모두 지우기 기능 (O)
// 3. 하나씩 지우기 기능 (O)
// 4. 클릭시 이동 기능
// 5. 추가하기 기능

interface LatelySearchProp {
  onInput: (word: string) => void;
}

const LatelySearch = ({ onInput }: LatelySearchProp) => {
  const [storageValue, setState] = useSearchedKeywordStorage(SEARCH_KEY);

  const handleClick = (value: string) => {
    onInput(value);
  };

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
                onClick={() => handleClick(value)}
                onDelete={() => {
                  const filterData = storageValue.filter((keyword: string) => value !== keyword);
                  setState([...filterData]);
                }}
              >
                {ellipsisName(value, 9)}
              </CommonTag>
            </KeywordBox>
          ))}
      </WrapperContent>
    </>
  );
};

export default LatelySearch;
