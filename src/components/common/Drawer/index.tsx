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
import { ReactNode } from 'react';

interface CommonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClickFooterButton: () => void;
  children: ReactNode;
  isFull: boolean;
  headerContent?: ReactNode;
  footerButtonText?: string;
}

const CommonDrawer = ({
  isOpen,
  onClose,
  isFull,
  children,
  onClickFooterButton,
  headerContent,
  footerButtonText,
}: CommonDrawerProps) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size={isFull ? 'full' : 'md'}>
        <DrawerOverlay minH="290px" />
        <DrawerContent minH="290px">
          <DrawerCloseButton />
          <DrawerHeader pt="28px">{isFull && headerContent}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          {isFull ? (
            <DrawerFooter justifyContent="center" pb="65px">
              <Button
                color="white"
                bgColor="blue.300"
                height="40px"
                width="290px"
                _hover={{ bgColor: 'blue.300' }}
                onClick={onClickFooterButton}
              >
                {footerButtonText}
              </Button>
            </DrawerFooter>
          ) : (
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
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
