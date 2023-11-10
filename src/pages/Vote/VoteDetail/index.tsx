import { CommonIconButton, CommonText, DateText, Header } from '@/shared/components';
import { Body, Content, Footer, Span, Title } from './style';
import { VoteOptionItem } from '@/features/vote/components';

const VoteDetail = () => {
  const deleteVoteDetail = () => {};

  return (
    <>
      <Header type="back" />
      <Body>
        <Title>
          <CommonText type="normalTitle">진행중인 투표</CommonText>
          <CommonIconButton type="delete" onClick={deleteVoteDetail} />
        </Title>
        <CommonText type="smallInfo">이거 엄마한테 선물드릴려고 하는데 뭐가 더 좋아?</CommonText>
        <Content>
          <VoteOptionItem />
          <Span>VS</Span>
          <VoteOptionItem />
        </Content>
        <Footer>
          <DateText createdDate="2023-11-10T07:35:32.716Z" />
          <CommonText type="smallInfo">00명 참여</CommonText>
        </Footer>
      </Body>
    </>
  );
};

export default VoteDetail;
