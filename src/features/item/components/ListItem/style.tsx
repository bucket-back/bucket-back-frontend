import styled from '@emotion/styled';
import { COMMON } from '@/shared/styles/Common';

export interface BlurProp {
  isDelete?: boolean;
  isDeleteMode?: boolean;
}

export const PositionWrapper = styled.div<BlurProp>`
  filter: ${(props) =>
    props.isDelete ? (props.isDeleteMode ? 'blur(1px);' : undefined) : undefined};
`;

export const ItemListWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style-type: none;
  cursor: pointer;
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
