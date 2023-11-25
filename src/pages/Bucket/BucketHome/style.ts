import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 1rem 2.44rem;
`;

export const TitlePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContentsWrapper = styled.div`
  height: calc(100vh - 215.91px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 1rem 2rem 0 2rem;
  overflow-y: auto;
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const NoResult = styled.div`
  height: calc(100vh - 215.91px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
