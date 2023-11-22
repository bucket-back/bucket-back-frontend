import { ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  Input,
  FormErrorMessage,
  InputGroup,
  forwardRef,
  FormLabel,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';

interface CommonInputProps {
  placeholder: string;
  type: 'password' | 'text';
  error?: FieldError;
  label?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  size?: 'sm' | 'md' | 'lg';
  width?: string;
  isDisabled?: boolean;
}

const CommonInput = forwardRef(
  (
    {
      placeholder,
      error,
      label,
      rightIcon,
      leftIcon,
      type,
      size = 'md',
      width = '18.4375rem',
      isDisabled = false,
      ...props
    }: CommonInputProps,
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(error?.message)}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup width={width} size={size}>
          {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
          <Input
            placeholder={placeholder}
            ref={ref}
            {...props}
            type={type}
            isDisabled={isDisabled}
          />
          {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
        </InputGroup>
        {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

export default CommonInput;
