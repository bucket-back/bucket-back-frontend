import { Flex } from '@chakra-ui/react';
import { CommonIcon, CommonText } from '@/shared/components';
import { OpenToastProps } from '@/shared/hooks/useCustomToast';

const CommonToast = ({ message, type }: OpenToastProps) => {
  return (
    <>
      <Flex
        borderRadius="0.625rem"
        alignItems="center"
        justifyContent="center"
        color="blue.900"
        p="0.69rem"
        bg="blue.100"
        gap="0.5rem"
      >
        {type === 'success' ? (
          <CommonIcon type="circleCheck" size="1.5rem" color="green.400" />
        ) : (
          <CommonIcon
            type="circleExclamation"
            size="1.5rem"
            color={type === 'error' ? 'red.400' : 'blue.800'}
          />
        )}
        <CommonText type="normalInfo" color="blue.900" noOfLines={0}>
          {message}
        </CommonText>
      </Flex>
    </>
  );
};

export default CommonToast;
