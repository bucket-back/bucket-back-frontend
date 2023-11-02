import { Box, useRadio, RadioProps } from '@chakra-ui/react';

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
        borderWidth={0.38}
        borderRadius="0.375rem"
        _checked={{
          bg: 'blue.300',
          color: 'white',
          borderColor: 'teal.600',
        }}
        px={2}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
