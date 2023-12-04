import { Spinner } from '@chakra-ui/react';

interface CommonSpinnerProps {
  size: string;
}

const CommonSpinner = ({ size }: CommonSpinnerProps) => {
  return <Spinner size={size} />;
};

export default CommonSpinner;
