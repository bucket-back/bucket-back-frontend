import styled from '@emotion/styled';

export const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

export const Grid = styled.ul`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(5, auto);
  grid-auto-flow: column;
  counter-reset: orderList 0;
  gap: 1.5rem 0;
`;

export const GridItemList = styled.li`
  &::before {
    counter-increment: orderList;
    content: counter(orderList) '. ';
    font-size: 0.75rem;
  }

  display: flex;
  align-items: center;
  gap: 0 0.3rem;

  &:nth-of-type(-n + 3)::before {
    color: blue;
  }
`;

export const Item = styled.a`
  cursor: pointer;
`;
