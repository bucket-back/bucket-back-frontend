import { IconButton } from '@chakra-ui/react';
import { CommonIcon } from '@/shared/components';

interface CommonIconButtonProps {
  type: 'delete' | 'create' | 'up' | 'update' | 'add' | 'detail' | 'back' | 'cancel';
  width?: `${number}rem`;
  height?: `${number}rem`;
  fontSize?: `${number}rem`;
  onClick: () => void;
}

const CommonIconButton = ({ type, width, height, fontSize, onClick }: CommonIconButtonProps) => {
  const iconButton = {
    delete: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        w={width || '2.5rem'}
        h={height || '2.5rem'}
        fontSize={fontSize || '1rem'}
        icon={<CommonIcon type="trashcan" />}
        onClick={onClick}
      />
    ),
    create: (
      <IconButton
        isRound
        color="white"
        bgColor="blue.300"
        w={width || '3.5rem'}
        h={height || '3.5rem'}
        fontSize={fontSize || '1.4375rem'}
        aria-label={`${type}`}
        icon={<CommonIcon type="pen" />}
        onClick={onClick}
      />
    ),
    up: (
      <IconButton
        isRound
        color="white"
        bgColor="gray.700"
        w={width || '2.5rem'}
        h={height || '2.5rem'}
        fontSize={fontSize || '1rem'}
        aria-label={`${type}`}
        icon={<CommonIcon type="arrowUp" />}
        onClick={onClick}
      />
    ),
    update: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        w={width || '2.5rem'}
        h={height || '2.5rem'}
        fontSize={fontSize || '1rem'}
        icon={<CommonIcon type="pen" />}
        onClick={onClick}
      />
    ),
    add: (
      <IconButton
        isRound
        color="white"
        bgColor="blue.300"
        w={width || '3.5rem'}
        h={height || '3.5rem'}
        fontSize={fontSize || '1.4375rem'}
        aria-label={`${type}`}
        icon={<CommonIcon type="plus" />}
        onClick={onClick}
      />
    ),
    detail: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        w={width || '2.5rem'}
        h={height || '2.5rem'}
        fontSize={fontSize || '1.5rem'}
        display="flex"
        icon={<CommonIcon type="chevronRight" />}
        onClick={onClick}
      />
    ),
    back: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        w={width || '2.5rem'}
        h={height || '2.5rem'}
        fontSize={fontSize || '1.25rem'}
        display="flex"
        icon={<CommonIcon type="chevronLeft" />}
        onClick={onClick}
      />
    ),
    cancel: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        w={width || '2.5rem'}
        h={height || '2.5rem'}
        fontSize={fontSize || '1.25rem'}
        display="flex"
        icon={<CommonIcon type="circleXmark" />}
        onClick={onClick}
      />
    ),
  };

  return <>{iconButton[type]}</>;
};

export default CommonIconButton;
