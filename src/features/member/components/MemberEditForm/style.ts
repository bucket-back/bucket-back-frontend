import styled from '@emotion/styled';

export const Form = styled.form`
  height: 93%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.8rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: start;
  gap: 0.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
  padding: 1rem 0;
`;

export const FileInput = styled.input`
  display: none;
`;
