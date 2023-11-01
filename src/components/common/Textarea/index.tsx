import { FormControl, Textarea, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useFormContext, RegisterOptions } from 'react-hook-form';

interface CommonTextareaProps {
  placeholder: string;
  name: string;
  registerOptions: RegisterOptions;
  label?: string;
  size: keyof typeof TEXTAREA_SIZE;
}

const TEXTAREA_SIZE = {
  xs: { width: '20.5rem', height: '5.8125rem' },
  sm: { width: '21.9375rem', height: '9.875rem' },
  base: { width: '21.9375rem', height: '14.375rem' },
};

const CommonTextarea = ({
  placeholder,
  name,
  label,
  registerOptions,
  size,
}: CommonTextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors[name]} isRequired={!!registerOptions.required}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        id={name}
        size="sm"
        isInvalid={!!errors[name]}
        _focusVisible={{ boxShadow: 'none', outline: 'none' }}
        placeholder={placeholder}
        {...TEXTAREA_SIZE[size]}
        {...register(name, registerOptions)}
      />
      {errors[name] && <FormErrorMessage>{errors[name]?.message as string}</FormErrorMessage>}
    </FormControl>
  );
};

export default CommonTextarea;
