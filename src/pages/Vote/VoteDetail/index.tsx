import { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, DateText, Header } from '@/shared/components';
import { Body, Content, Footer, Span, Title } from './style';
import { VoteOptionItem } from '@/features/vote/components';
import { useDeleteVote, useParticipationVote } from '@/features/vote/hooks';
import voteQueryOption from '@/features/vote/service/queryOption';

const VoteDetail = () => {
  const { voteId } = useParams();
  const { data: voteDetailData } = useQuery({ ...voteQueryOption.detail(Number(voteId)) });
  const { mutate: DeleteVoteMutate } = useDeleteVote();
  const { mutate: ParticipationVoteMutate } = useParticipationVote();

  const deleteVoteDetail = () => {
    // 정말 삭제할것인지 모달창을 띄워줘야하나?
    DeleteVoteMutate(Number(voteId)); // 추후 파라미터에서 id값을 받아와서 입력
  };
  const toggleVoteParticipation = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    ParticipationVoteMutate({ voteId: Number(voteId), itemId: Number(value) });
  };

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
            onClick={toggleVoteParticipation}
          />
          <Span>VS</Span>
          <VoteOptionItem
            itemInfo={voteDetailData?.item2Info}
            votes={voteDetailData?.voteInfo.item2Votes}
            onClick={toggleVoteParticipation}
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
