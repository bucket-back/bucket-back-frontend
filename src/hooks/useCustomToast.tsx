import { useToast } from '@chakra-ui/react';
import CommonToast from '../components/common/Toast';

export interface OpenToastProps {
  message: string;
  type: 'info' | 'success' | 'error';
}

const TOAST_DURATION = 2000;

const useCustomToast = () => {
  const toast = useToast();

  const openToast = ({ message, type }: OpenToastProps) => {
    return toast({
      position: 'top',
      duration: TOAST_DURATION,
      render: () => <CommonToast message={message} type={type} />,
    });
  };

  return {
    openToast,
  };
};

export default useCustomToast;
