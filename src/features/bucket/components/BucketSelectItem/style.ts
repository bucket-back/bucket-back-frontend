import styled from '@emotion/styled';

export const Body = styled.main`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const ItemBox = styled.div`
  margin-bottom: 1rem;
`;
