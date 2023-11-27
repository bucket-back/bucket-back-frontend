import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonSelect, CommonTabs } from '@/shared/components';
import { useAuthCheck } from '@/shared/hooks';
import { GetVotesRequest, voteQueryOption } from '../../service';
import VoteItem from '../VoteItem';
import { Container, ContentsWrapper, NoResult, SelectWrapper } from './style';
import useIntersect from '@/shared/hooks/useIntersect';

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

interface VotesProps {
  getStatus: string;
  getHobby: string;
  getSort: string;
}

const Votes = ({ getStatus, getHobby, getSort }: VotesProps) => {
  const {
    data: votesData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...voteQueryOption.list({
      hobby: getHobby || '',
      status: (getStatus as GetVotesRequest['status']) || 'completed',
      sort: (getSort as GetVotesRequest['sort']) || 'recent',
    }),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = useAuthCheck();

  const votes = votesData?.pages.flatMap(({ votes }) => votes) || [];

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
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const ref = useIntersect(async (entry, observer) => {
            observer.unobserve(entry.target);

            if (hasNextPage) {
              fetchNextPage();
            }
          });

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
                ) : votes.length > 0 ? (
                  <>
                    {votes.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
                      return (
                        <VoteItem
                          key={cursorId}
                          item1Info={item1Info}
                          item2Info={item2Info}
                          voteInfo={voteInfo}
                        />
                      );
                    })}
                    <div id={VALUE} ref={ref} />
                  </>
                ) : (
                  <NoResult>{`${LABEL}가 존재하지 않습니다.`}</NoResult>
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
