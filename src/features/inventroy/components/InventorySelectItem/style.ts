import styled from '@emotion/styled';

export const Container = styled.main`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.7rem;
`;
