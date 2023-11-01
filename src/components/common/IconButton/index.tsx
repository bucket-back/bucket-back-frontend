import { IconButton } from '@chakra-ui/react';
import CommonIcon from '../Icon';

interface CommonIconButtonProps {
  type: 'delete' | 'create' | 'up' | 'modify' | 'add' | 'detail';
  onClick: () => void;
}

const CommonIconButton = ({ type, onClick }: CommonIconButtonProps) => {
  const iconButton = {
    delete: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        w="2.5rem"
        h="2.5rem"
        icon={<CommonIcon type="trashcan" />}
        onClick={onClick}
      />
    ),
    create: (
      <IconButton
        isRound
        color="white"
        bgColor="blue.300"
        w="4.0625rem"
        h="4.0625rem"
        fontSize="1.4375rem"
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
        w="2.5rem"
        h="2.5rem"
        aria-label={`${type}`}
        icon={<CommonIcon type="arrowUp" />}
        onClick={onClick}
      />
    ),
    modify: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        w="2.5rem"
        h="2.5rem"
        icon={<CommonIcon type="pen" />}
        onClick={onClick}
      />
    ),
    add: (
      <IconButton
        isRound
        color="white"
        bgColor="blue.300"
        w="4.0625rem"
        h="4.0625rem"
        fontSize="1.4375rem"
        aria-label={`${type}`}
        icon={<CommonIcon type="plus" />}
        onClick={onClick}
      />
    ),
    detail: (
      <IconButton
        variant="unstyled"
        aria-label={`${type}`}
        fontSize="1.5rem"
        w="2.5rem"
        h="2.5rem"
        display="flex"
        icon={<CommonIcon type="chevronRight" />}
        onClick={onClick}
      />
    ),
  };

  return <>{iconButton[type]}</>;
};

export default CommonIconButton;
