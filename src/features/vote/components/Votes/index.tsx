import { useSearchParams } from 'react-router-dom';
import { CommonSelect, CommonTabs } from '@/shared/components';
import { useAuthCheck } from '@/shared/hooks';
import VoteList from '../VoteList';
import { Container, ContentsWrapper, NoResult, SelectWrapper } from './style';

const VOTE_STATE = [
  {
    VALUE: 'completed',
    LABEL: '종료된 투표',
  },
  {
    VALUE: 'posted',
    LABEL: '올린 투표',
  },
  {
    VALUE: 'participated',
    LABEL: '참여한 투표',
  },
];

const Votes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = useAuthCheck();

  const currentTabIndex = VOTE_STATE.map(({ VALUE }) => VALUE).indexOf(
    searchParams.get('status') || VOTE_STATE[0].VALUE
  );
  const isLoginInVotes = (value: string) => value !== 'completed' && !isLogin;

  return (
    <Container>
      <CommonTabs
        currentTabIndex={currentTabIndex}
        onClick={(value) => {
          setSearchParams({ hobby: searchParams.get('hobby') || '', status: value });
        }}
        tabsData={VOTE_STATE.map(({ VALUE, LABEL }) => {
          return {
            value: VALUE,
            label: LABEL,
            content: (
              <ContentsWrapper>
                <SelectWrapper>
                  {VALUE === 'completed' && (
                    <CommonSelect
                      selectedValue={searchParams.get('sort')?.toLowerCase()}
                      onChange={(e) => {
                        const sort = e.target.value;
                        setSearchParams({
                          hobby: searchParams.get('hobby') || '',
                          status: searchParams.get('status') || '',
                          sort: sort,
                        });
                      }}
                    />
                  )}
                </SelectWrapper>
                {isLoginInVotes(VALUE) ? (
                  <NoResult>로그인이 필요한 서비스입니다.</NoResult>
                ) : (
                  <VoteList label={LABEL} />
                )}
              </ContentsWrapper>
            ),
          };
        })}
      />
    </Container>
  );
};

export default Votes;
