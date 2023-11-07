import { Box, useRadio, RadioProps } from '@chakra-ui/react';
import { CommonText } from '@/shared/components';

const RadioCard = (props: RadioProps) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="0.024rem"
        borderRadius="0.375rem"
        _checked={{
          bg: 'blue.300',
          color: 'white',
          borderColor: 'teal.600',
        }}
        p="0rem 1rem"
      >
        <CommonText type="strongInfo" color={input.checked ? 'white' : 'blue.300'} noOfLines={1}>
          {String(props.value)}
        </CommonText>
      </Box>
    </Box>
  );
};

export default RadioCard;
