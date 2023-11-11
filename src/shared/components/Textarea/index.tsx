import { FieldError } from 'react-hook-form';
import { FormControl, Textarea, FormErrorMessage, FormLabel, forwardRef } from '@chakra-ui/react';

interface CommonTextareaProps {
  placeholder: string;
  label?: string;
  error?: FieldError;
  size: keyof typeof TEXTAREA_SIZE;
}

const TEXTAREA_SIZE = {
  xs: { width: 'full', height: '5.8125rem' },
  sm: { width: 'full', height: '9.875rem' },
  base: { width: 'full', height: '14.375rem' },
};

const CommonTextarea = forwardRef(
  ({ placeholder, label, size, error, ...props }: CommonTextareaProps, ref) => {
    return (
      <FormControl isInvalid={Boolean(error?.message)}>
        <FormLabel>{label}</FormLabel>
        <Textarea
          fontSize="sm"
          placeholder={placeholder}
          ref={ref}
          {...TEXTAREA_SIZE[size]}
          {...props}
        />
        {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

export default CommonTextarea;
