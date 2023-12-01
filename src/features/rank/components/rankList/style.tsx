import styled from '@emotion/styled';

export const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

export const Grid = styled.ul`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  /* grid-template: repeat(5, auto) repeat(2, 1fr); */
  grid-auto-flow: column;
  counter-reset: orderList 0;
  gap: 1rem 0;
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

  &:nth-child(-n + 3)::before {
    color: blue; /* 첫 번째부터 세 번째까지의 항목에만 적용할 스타일 */
  }
`;
