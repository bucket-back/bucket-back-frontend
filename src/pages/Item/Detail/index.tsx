import styled from '@emotion/styled';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
  Header,
} from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import ItemComment from '@/features/item/components/ItemComment/index';

const ItemDetail = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <CommonImage size="md" />
        <ItemWrapper>
          <CommonText type="boldNormalInfo" noOfLines={0}>
            아레나 취미활동 수영복
          </CommonText>
          <ItemBox>
            <CommonIcon type="star" />
            <CommonText type="smallInfo" noOfLines={0}>
              4.5 / 5
            </CommonText>
          </ItemBox>
        </ItemWrapper>
        <CommonText type="boldNormalInfo">{formatNumber(23900)}</CommonText>
        <ButtonWrapper>
          <CommonButton type="mdSmall">아이템 담기</CommonButton>
          <CommonButton type="mdBase">구매하러 가기</CommonButton>
        </ButtonWrapper>
        <CommonButton type="mdFull">리뷰 쓰기</CommonButton>
      </Container>
      <div>
        <CommonDivider size="lg" />
        <CommentNumberWrapper>
          <CommonText type="normalInfo">총 0개의 댓글</CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        <ItemComment />
        <CommonDivider size="sm" />
      </CommentsContainer>
    </>
  );
};

export default ItemDetail;

const Container = styled.main`
  padding: 0 2.44rem 2.44rem 2.44rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemBox = styled.div`
  display: flex;
  gap: 0 0.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 0.2rem;
`;

const CommentsContainer = styled.section`
  height: 100%;
  overflow-y: scroll;
`;

const CommentNumberWrapper = styled.div`
  padding: 1rem 1.75rem;
`;
