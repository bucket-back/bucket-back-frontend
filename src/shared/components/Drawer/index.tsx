import { ReactNode } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';

interface CommonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClickFooterButton: () => void;
  children: ReactNode;
  isFull: boolean;
  headerContent?: ReactNode;
  footerButtonText?: string;
  isCloseButton?: boolean;
  isDisabled?: boolean;
}

const CommonDrawer = ({
  isOpen,
  onClose,
  isFull,
  children,
  onClickFooterButton,
  headerContent,
  footerButtonText,
  isCloseButton = true,
  isDisabled = false,
}: CommonDrawerProps) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size={isFull ? 'full' : 'md'}>
        <DrawerOverlay
          w="100%"
          maxW="26.875rem !important"
          position="absolute"
          right="0"
          left="0"
          m="auto"
        />
        <DrawerContent w="100%" maxW="26.875rem !important" m="auto">
          {isCloseButton && <DrawerCloseButton />}
          <DrawerHeader pt="1.75rem">{isFull && headerContent}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          {isFull ? (
            Boolean(footerButtonText) && (
              <DrawerFooter justifyContent="center" pb="4.0625rem">
                <Button
                  color="white"
                  bgColor="blue.300"
                  height="2.5rem"
                  width="18.125rem"
                  _hover={{ bgColor: 'blue.300' }}
                  onClick={onClickFooterButton}
                  isDisabled={isDisabled}
                >
                  {footerButtonText}
                </Button>
              </DrawerFooter>
            )
          ) : (
            <DrawerFooter>
              <Button variant="outline" mr="0.75rem" onClick={onClose}>
                취소
              </Button>
              <Button
                color="white"
                bgColor="red.400"
                _hover={{ bgColor: 'red.400' }}
                onClick={onClickFooterButton}
              >
                확인
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommonDrawer;
