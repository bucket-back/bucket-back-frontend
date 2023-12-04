import styled from '@emotion/styled';

export const Container = styled.main`
  padding: 0 2.44rem 2.44rem 2.44rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Box = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const RadioBox = styled.div`
  overflow-x: auto;
`;

export const SelectedItems = styled.div`
  display: flex;
  gap: 0.5rem;
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
