import { CommonCard, CommonImage, CommonText } from '@/shared/components';
import { ItemInfo, VoteInfo } from '@/shared/types';
import { ContentsContainer, ContentsWrapper, VsBox } from './style';

interface VoteItemProps {
  voteInfo: VoteInfo;
  item1Info: ItemInfo;
  item2Info: ItemInfo;
}

const VoteItem = ({ item1Info, item2Info, voteInfo }: VoteItemProps) => {
  return (
    <CommonCard count={voteInfo.participants} date={voteInfo.startTime} onClick={() => {}}>
      <ContentsContainer>
        <CommonText type="smallInfo">{voteInfo.content}</CommonText>
        <ContentsWrapper>
          <div>
            <CommonImage size="base" src={item1Info.image} />
            <CommonText type="smallInfo">{item1Info.price}</CommonText>
            <CommonText type="smallInfo">{item1Info.name}</CommonText>
          </div>
          <VsBox>
            <CommonText type="smallInfo" noOfLines={0}>
              VS
            </CommonText>
          </VsBox>
          <div>
            <CommonImage size="base" src={item2Info.image} />
            <CommonText type="smallInfo">{item2Info.price}</CommonText>
            <CommonText type="smallInfo">{item2Info.name}</CommonText>
          </div>
        </ContentsWrapper>
      </ContentsContainer>
    </CommonCard>
  );
};

export default VoteItem;
