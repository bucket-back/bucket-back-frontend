import { Box, Button } from '@chakra-ui/react';
import CommonIcon from '../Icon';
import { MouseEvent } from 'react';

interface CommonButtonProps {
  type:
    | 'md_full'
    | 'md_middle'
    | 'md_base'
    | 'md_small'
    | 'sm'
    | 'xs'
    | 'text'
    | 'sm_text'
    | 'custom';
  isClick?: boolean;
  isDisabled: boolean;
  children: string;
  onClick: () => void;
}

const CommonButton = ({ type, isDisabled, isClick, children, onClick }: CommonButtonProps) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const button = {
    md_full: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        variant="solid"
        width="100%"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    md_middle: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        variant="solid"
        width="18.125rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    md_base: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        variant="solid"
        width="15rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    md_small: (
      <Button
        size="md"
        bg="blue.700"
        colorScheme="blue"
        variant="solid"
        width="7.25rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    sm: (
      <Button
        size="sm"
        colorScheme="blue"
        variant="outline"
        border="1px solid var(--blue-300, #63B3ED);"
        bg={isClick ? 'blue.300' : undefined}
        color={isClick ? 'white' : 'blue.300'}
        leftIcon={<CommonIcon type="heart" />}
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    xs: (
      <Button
        size="xs"
        colorScheme="gray"
        variant="outline"
        border="1px solid var(--white, #FFF);"
        leftIcon={<CommonIcon type="chevronRight" />}
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    text: (
      <Button colorScheme="blue" onClick={handleClick} variant="link" isDisabled={isDisabled}>
        {children}
      </Button>
    ),
    sm_text: (
      <Button colorScheme="gray" onClick={handleClick} variant="link" isDisabled={isDisabled}>
        {children}
      </Button>
    ),
    custom: (
      <Box
        as="button"
        width="6.125rem"
        height="5.625rem"
        borderRadius="0.625rem"
        bg=" linear-gradient(90deg, #E2E8F0 0%, #EDF2F7 100%)"
        onClick={handleClick}
        disabled={isDisabled}
      >
        <CommonIcon type="plus" />
      </Box>
    ),
  };

  return <>{button[type]}</>;
};

export default CommonButton;
