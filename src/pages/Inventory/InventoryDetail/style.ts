import styled from '@emotion/styled';

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

export const Container = styled.main`
  padding: 0 2.44rem 2.44rem 2.44rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  padding: 1rem 0 1rem 0;
`;
