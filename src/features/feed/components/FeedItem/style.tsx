import styled from '@emotion/styled';
import { COMMON } from '@/shared/styles/Common';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0 2.5rem;
  cursor: pointer;
`;

export const BucketInfoBox = styled.div`
  margin-top: 1rem;
`;

export const ImageBox = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
`;

export const DetailInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

export const InteractPanel = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const LikeBox = styled.span`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: ${COMMON.COLORS.PLACEHOLDER_COLOR};
`;

export const LikeNumber = styled.span`
  font-size: 0.75rem;
  color: ${COMMON.COLORS.PLACEHOLDER_COLOR};
`;

export const CommentBox = styled.span`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: ${COMMON.COLORS.PLACEHOLDER_COLOR};
`;

export const CommentNumber = styled.span`
  font-size: 0.75rem;
`;

export const ImageBorder = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 10px;
`;
