import styled from '@emotion/styled';

export interface FormProps {
  isFocus?: boolean;
}

export const Form = styled.form<FormProps>`
  padding: ${(props) => (props.isFocus ? undefined : '0 1.75rem')};
`;
