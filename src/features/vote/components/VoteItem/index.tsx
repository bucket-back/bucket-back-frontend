import { useNavigate } from 'react-router-dom';
import { CommonCard, CommonImage, CommonText } from '@/shared/components';
import { ItemInfo, VoteInfo } from '@/shared/types';
import { formatNumber } from '@/shared/utils';
import { ContentsContainer, ContentsWrapper, VoteImageWrapper, VsBox } from './style';

interface VoteItemProps {
  voteInfo: VoteInfo;
  item1Info: ItemInfo;
  item2Info: ItemInfo;
}

const VoteItem = ({ item1Info, item2Info, voteInfo }: VoteItemProps) => {
  const navigate = useNavigate();

  return (
    <CommonCard
      count={voteInfo.participants}
      date={voteInfo.startTime}
      onClick={() => {
        navigate(`${voteInfo.id}`);
      }}
      isVoting={voteInfo.isVoting}
    >
      <ContentsContainer>
        <CommonText type="smallInfo">{voteInfo.content}</CommonText>
        <ContentsWrapper>
          <VoteImageWrapper>
            <CommonImage size="base" src={item1Info.image} />
            <CommonText type="smallInfo">{formatNumber(item1Info.price)}</CommonText>
            <CommonText type="smallInfo">{item1Info.name}</CommonText>
          </VoteImageWrapper>
          <VsBox>
            <CommonText type="smallInfo" noOfLines={0}>
              VS
            </CommonText>
          </VsBox>
          <VoteImageWrapper>
            <CommonImage size="base" src={item2Info.image} />
            <CommonText type="smallInfo">{formatNumber(item2Info.price)}</CommonText>
            <CommonText type="smallInfo">{item2Info.name}</CommonText>
          </VoteImageWrapper>
        </ContentsWrapper>
      </ContentsContainer>
    </CommonCard>
  );
};

export default VoteItem;
