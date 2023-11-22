import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TitleWrapper = styled.div`
  padding-top: 1rem;
  padding-left: 1.25rem;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  overflow-x: scroll;
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const NoVotesInProgress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;
`;
