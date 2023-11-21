import { Box, Button } from '@chakra-ui/react';
import { CommonIcon } from '@/shared/components';

interface CommonButtonProps {
  type:
    | 'mdFull'
    | 'mdMiddle'
    | 'mdBase'
    | 'mdSmall'
    | 'sm'
    | 'xs'
    | 'text'
    | 'smText'
    | 'xsText'
    | 'custom'
    | 'profile'
    | 'link';
  isClick?: boolean;
  isDisabled?: boolean;
  children?: string;
  onClick?: () => void;
  isSubmit?: boolean;
  width?: string;
  src?: string;
}

const CommonButton = ({
  type,
  isDisabled = false,
  isClick,
  children,
  onClick,
  isSubmit = false,
  width = '100%',
  src,
}: CommonButtonProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  const button = {
    mdFull: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        width="100%"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    mdMiddle: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        width="100%"
        maxW="18.125rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    mdBase: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        width={width}
        maxW="15rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    mdSmall: (
      <Button
        size="md"
        bg="blue.700"
        colorScheme="blue"
        width="100%"
        maxW="7.25rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    link: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        width={width}
        maxW="15rem"
        px="1rem"
        onClick={handleClick}
        href={src}
        as="a"
      >
        {children}
      </Button>
    ),
    sm: (
      <Button
        size="sm"
        colorScheme="blue"
        variant="outline"
        borderColor="blue.300"
        bg={isClick ? 'blue.300' : undefined}
        color={isClick ? 'white' : 'blue.300'}
        leftIcon={<CommonIcon type="heart" />}
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    xs: (
      <Button
        size="xs"
        colorScheme="gray"
        variant="outline"
        borderColor="white"
        leftIcon={<CommonIcon type="chevronRight" />}
        onClick={handleClick}
        isDisabled={isDisabled}
        _hover={{
          bg: 'none',
        }}
        lineHeight={1.6}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    text: (
      <Button
        colorScheme="blue.900"
        onClick={handleClick}
        variant="link"
        isDisabled={isDisabled}
        _hover={{
          textDecor: 'none',
        }}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    smText: (
      <Button
        colorScheme="gray"
        onClick={handleClick}
        variant="link"
        isDisabled={isDisabled}
        _hover={{
          textDecor: 'none',
        }}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    xsText: (
      <Button
        size="xs"
        colorScheme="gray"
        onClick={handleClick}
        variant="link"
        isDisabled={isDisabled}
        _hover={{
          textDecor: 'none',
        }}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    custom: (
      <Box
        as="button"
        width="6.125rem"
        height="5.625rem"
        borderRadius="0.625rem"
        bg="linear-gradient(90deg, #E2E8F0 0%, #EDF2F7 100%)"
        onClick={handleClick}
        disabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        <CommonIcon type="plus" />
      </Box>
    ),
    profile: (
      <Button
        size="xs"
        bg="gray.100"
        color="gray.800"
        width="fit-content"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
  };

  return <>{button[type]}</>;
};

export default CommonButton;
