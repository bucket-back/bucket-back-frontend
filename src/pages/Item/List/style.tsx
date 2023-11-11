import styled from '@emotion/styled';

export const CommonContainer = styled.div`
  padding: 0 1.75rem;
  overflow-y: scroll;
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

export const AddContainer = styled.div`
  position: fixed;
  right: 460px;
  bottom: 85px;
  z-index: 10;
  @media (max-width: 390px) {
    right: 20px;
  }
`;

export const PositionWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`;

export const ItemListWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style-type: none;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: -25px;
  right: 0px;
`;
