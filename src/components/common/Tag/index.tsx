import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { ReactElement } from 'react';
import CommonIcon from '../Icon/index';

interface CommonTagProps {
  type: 'feed' | 'search';
  children: ReactElement;
  onClick: () => void;
  onDelete?: () => void;
}

const CommonTag = ({ type, children, onClick, onDelete }: CommonTagProps) => {
  const tag = {
    feed: (
      <Tag onClick={() => onClick()} size="md" variant="subtle" color="white" bg="blackAlpha.700">
        <TagLabel>{children}</TagLabel>
        <CommonIcon type="chevronRight" />
      </Tag>
    ),
    search: (
      <Tag onClick={() => onClick()} size="md" variant="subtle" bg="blue.100">
        <TagLabel>{children}</TagLabel>
        <TagCloseButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete!();
          }}
        />
      </Tag>
    ),
  };

  return <>{tag[type]}</>;
};

export default CommonTag;
