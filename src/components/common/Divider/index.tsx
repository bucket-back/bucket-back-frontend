import { Divider } from '@chakra-ui/react';

interface CommonDividerProps {
  size: 'sm' | 'lg';
}

const sizes = {
  sm: 'none',
  lg: 'thick',
};

const CommonDivider = ({ size }: CommonDividerProps) => {
  return <Divider width="inherit" borderWidth={sizes[size]} />;
};

export default CommonDivider;
