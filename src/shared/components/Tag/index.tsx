import { ReactElement, MouseEvent } from 'react';
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { CommonIcon } from '@/shared/components';

interface CommonTagProps {
  type: 'feed' | 'search';
  children: ReactElement;
  onClick?: () => void;
  onDelete?: () => void;
}

const CommonTag = ({ type, children, onClick, onDelete }: CommonTagProps) => {
  const handleClick = (e: MouseEvent, onEvent?: () => void) => {
    e.stopPropagation();
    onEvent && onEvent();
  };

  const tag = {
    feed: (
      <Tag
        onClick={(e) => handleClick(e, onClick)}
        size="md"
        variant="subtle"
        color="white"
        bg="blackAlpha.700"
      >
        <TagLabel>{children}</TagLabel>
        <CommonIcon type="chevronRight" />
      </Tag>
    ),
    search: (
      <Tag onClick={(e) => handleClick(e, onClick)} size="md" variant="subtle" bg="blue.100">
        <TagLabel>{children}</TagLabel>
        <TagCloseButton onClick={(e) => handleClick(e, onDelete)} />
      </Tag>
    ),
  };

  return <>{tag[type]}</>;
};

export default CommonTag;
