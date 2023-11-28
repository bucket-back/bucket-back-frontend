import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: white;
  padding-top: 2rem;
  border-radius: 2rem 2rem 0 0;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow-y: scroll;
  height: calc(100vh - 29.542rem);
  padding: 1rem 0;
`;

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding-right: 0.5rem;
`;

export const NoResult = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
