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
  height: calc(100vh - 10.807rem);
`;

export const AddButtonWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
`;
