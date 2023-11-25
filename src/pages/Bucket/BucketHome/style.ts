import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem 1rem 2.44rem;
`;

export const ContentsWrapper = styled.div`
  height: calc(100vh - 215.91px);
`;

export const ContentsPanel = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 1rem 2rem 1rem 2rem;
  overflow-y: auto;
`;

export const ContentsBox = styled.div`
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

export const AddButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
`;
