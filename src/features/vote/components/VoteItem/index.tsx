import { CommonCard, CommonImage, CommonText } from '@/shared/components';
import { ContentsContainer, ContentsWrapper, VsBox } from './style';

const VoteItem = () => {
  return (
    <CommonCard count={0} date="2023-11-12T12:16:49.407Z" onClick={() => {}}>
      <ContentsContainer>
        <CommonText type="smallInfo">이거 엄마한테 선물드릴려고하는데 어떰?</CommonText>
        <ContentsWrapper>
          <div>
            <CommonImage size="base" />
            <CommonText type="smallInfo">29,800</CommonText>
            <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
          </div>
          <VsBox>
            <CommonText type="smallInfo" noOfLines={0}>
              VS
            </CommonText>
          </VsBox>
          <div>
            <CommonImage size="base" />
            <CommonText type="smallInfo">29,800</CommonText>
            <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
          </div>
        </ContentsWrapper>
      </ContentsContainer>
    </CommonCard>
  );
};

export default VoteItem;
