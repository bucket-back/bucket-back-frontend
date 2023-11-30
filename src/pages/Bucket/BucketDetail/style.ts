import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 1rem 2.44rem;
`;

export const TitlePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ContentsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0 2.44rem 1rem 2.44rem;
  overflow-y: auto;
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ImageBorder = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 10px;
`;
