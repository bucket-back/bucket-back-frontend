import styled from '@emotion/styled';

export const Container = styled.main`
  padding: 0 2.44rem 2.44rem 2.44rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ItemWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.2rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 0.2rem;
`;

export const CommentsContainer = styled.section`
  height: 100%;
  overflow-y: scroll;
`;

export const CommentNumberWrapper = styled.div`
  padding: 1rem 1.75rem;
`;

export const Box = styled.div`
  flex-shrink: 0;
`;

export const ReviewBox = styled.article`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
