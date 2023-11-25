import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 1rem 2rem 0 2rem;
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
