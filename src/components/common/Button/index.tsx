import { Box, Button } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import CommonIcon from '../Icon';

interface CommonButtonProps {
  type: 'MdFull' | 'MdMiddle' | 'MdBase' | 'MdSmall' | 'sm' | 'xs' | 'text' | 'smText' | 'custom';
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
    MdFull: (
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
    MdMiddle: (
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
    MdBase: (
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
    MdSmall: (
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
    SmText: (
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
