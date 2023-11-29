import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonImage, CommonText } from '@/shared/components';
import { useAuthCheck, useCustomToast } from '@/shared/hooks';
import { ItemInfo } from '@/shared/types';
import { formatNumber } from '@/shared/utils';
import { useCancelVote, useParticipationVote } from '../../hooks';
import { GetVoteDetailResponse } from '../../service';
import { Button, ItemWrapper, TextWrapper } from './style';

interface VoteOptionItemProps {
  voteDetailData: GetVoteDetailResponse;
  itemInfo?: ItemInfo;
  votes?: number;
  voteId: number;
}

const VoteOptionItem = ({ itemInfo, votes, voteDetailData, voteId }: VoteOptionItemProps) => {
  const isLogin = useAuthCheck();
  const navigate = useNavigate();
  const openToast = useCustomToast();
  const { mutate: ParticipationVoteMutate } = useParticipationVote(voteId);
  const { mutate: CancelVoteMutate } = useCancelVote(voteId);

  const toggleVoteParticipation = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (voteDetailData?.voteInfo.isVoting && isLogin) {
      if (voteDetailData?.selectedItemId !== Number(value)) {
        ParticipationVoteMutate({ voteId: voteId, itemId: Number(value) });
      } else {
        CancelVoteMutate(voteId);
      }
    } else if (!voteDetailData?.voteInfo.isVoting) {
      openToast({ type: 'error', message: '종료된 투표에는 참여하실수 없습니다.' });
    } else {
      openToast({ type: 'error', message: '로그인이 필요한 서비스입니다.' });
    }
  };

  return (
    <div>
      <ItemWrapper>
        <CommonImage
          size="lg"
          src={itemInfo?.image}
          onClick={() => navigate(`/item/${itemInfo?.id}`)}
        />
        <Button value={itemInfo?.id} type="button" onClick={(e) => toggleVoteParticipation(e)}>
          {votes}
        </Button>
      </ItemWrapper>
      <TextWrapper>
        <CommonText type="smallTitle">{formatNumber(itemInfo?.price || 0)}</CommonText>
        <CommonText type="smallInfo">{itemInfo?.name}</CommonText>
      </TextWrapper>
    </div>
  );
};

export default VoteOptionItem;
