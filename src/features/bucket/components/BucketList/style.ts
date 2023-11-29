import styled from '@emotion/styled';

export const Container = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 1rem 2rem 1rem 2rem;
  overflow-y: auto;
`;

export const BucketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const NoResult = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
