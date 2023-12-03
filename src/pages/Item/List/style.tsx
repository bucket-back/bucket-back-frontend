import styled from '@emotion/styled';

export const CommonContainer = styled.div`
  padding: 0 1.75rem 1.75rem;
  overflow-y: auto;
  height: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemTextContaienr = styled.div`
  margin: 1rem 0;
`;

export const ItemListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-auto-rows: auto;
  gap: 0.9rem;
  padding: 0 0.87rem;
`;

export const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const AddContainer = styled.div`
  position: absolute;
  bottom: 90px;
  right: 20px;
  z-index: 10;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(6rem, 1fr));
  gap: 0.5rem;
`;

export const NoResult = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
