import { Divider } from '@chakra-ui/react';

interface CommonDividerProps {
  size: 'sm' | 'lg';
}

const SIZES = {
  sm: 'none',
  lg: 'thick',
};

const CommonDivider = ({ size }: CommonDividerProps) => {
  return <Divider width="inherit" borderWidth={SIZES[size]} />;
};

export default CommonDivider;
