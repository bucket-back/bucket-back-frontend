import styled from '@emotion/styled';
import { COMMON } from '@/shared/styles/Common';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 1rem;
`;

export const BucketListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 2rem 0;
`;

export const BucketBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const AddBucketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 1rem;
`;

export const AddBucketButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

  cursor: pointer;
`;
