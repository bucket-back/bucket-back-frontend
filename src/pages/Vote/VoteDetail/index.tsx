import { useQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, DateText, Header } from '@/shared/components';
import { Body, Content, Footer, Span, Title } from './style';
import { VoteOptionItem } from '@/features/vote/components';
import voteQueryOption from '@/features/vote/service/queryOption';

const VoteDetail = () => {
  const { data: voteDetailData } = useQuery({ ...voteQueryOption.detail(6) });
  const deleteVoteDetail = () => {};

  return (
    <>
      <Header type="back" />
      <Body>
        <Title>
          <CommonText type="normalTitle" noOfLines={0}>
            {voteDetailData?.voteInfo.isVoting ? '진행중인 투표' : '종료된 투표'}
          </CommonText>
          {voteDetailData?.isOwner && <CommonIconButton type="delete" onClick={deleteVoteDetail} />}
        </Title>
        <CommonText type="smallInfo" noOfLines={0}>
          {voteDetailData?.voteInfo.content}
        </CommonText>
        <Content>
          <VoteOptionItem
            itemInfo={voteDetailData?.item1Info}
            votes={voteDetailData?.voteInfo.item1Votes}
          />
          <Span>VS</Span>
          <VoteOptionItem
            itemInfo={voteDetailData?.item2Info}
            votes={voteDetailData?.voteInfo.item2Votes}
          />
        </Content>
        <Footer>
          <DateText createdDate={voteDetailData?.voteInfo.startTime || ''} />
          <CommonText type="smallInfo" noOfLines={0}>
            {voteDetailData?.voteInfo.participants}명 참여
          </CommonText>
        </Footer>
      </Body>
    </>
  );
};

export default VoteDetail;
