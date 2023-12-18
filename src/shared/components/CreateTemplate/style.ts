import styled from '@emotion/styled';

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const RadioBox = styled.div`
  overflow-x: auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;
