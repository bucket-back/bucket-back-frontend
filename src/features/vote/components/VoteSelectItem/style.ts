import styled from '@emotion/styled';
import { COMMON } from '@/shared/styles/Common';

export const Container = styled.main`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const GridItem = styled.div`
  margin-bottom: 1rem;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageLabel = styled.label`
  position: relative;
  &::before {
    content: '✓';
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    background-color: ${COMMON.COLORS.MAIN_COLOR};
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    transition-duration: 0.4s;
    transform: scale(0);
    z-index: 999;
  }

  input:checked + &::before {
    transform: scale(1);
  }
`;
