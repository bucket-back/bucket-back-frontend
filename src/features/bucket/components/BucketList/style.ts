import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TotalCountWrapper = styled.div`
  padding: 1rem 1rem 0 2rem;
`;

export const BucketWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 1rem 2rem 1rem 2rem;
  overflow-y: auto;
`;

export const BucketBox = styled.div`
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
