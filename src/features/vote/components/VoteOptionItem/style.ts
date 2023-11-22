import styled from '@emotion/styled';
import { COMMON } from '@/shared/styles/Common';

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Button = styled.button`
  position: absolute;
  bottom: -2rem;
  right: 40%;
  color: white;
  border-radius: 50%;
  width: 4.0625rem;
  height: 4.0625rem;
  background-color: ${COMMON.COLORS.MAIN_COLOR};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  gap: 0.3rem;
`;
