import { CommonButton, CommonDrawer, CommonRadio, CommonText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Box, Container, Wrapper } from './style';
import InventorySelectItem from '@/features/inventroy/components/InventorySelectItem';

const InventoryCreate = () => {
  const { isOpen, onOpen, onClose } = useDrawer();

  return (
    <>
      <Header type="back" />
      <Container>
        <Wrapper>
          <Box>
            <CommonText type="normalTitle" noOfLines={0}>
              인벤토리 생성하기
            </CommonText>
          </Box>
          <Box>
            <CommonText type="normalInfo" noOfLines={0}>
              취미별 인벤토리를 생성할 수 있습니다.
            </CommonText>
            <CommonText type="normalInfo" noOfLines={0}>
              취미를 선택해주세요.
            </CommonText>
            <CommonRadio values={['농구', '수영']} name="취미" onChange={() => {}} />
          </Box>
          <Box>
            <CommonText type="normalInfo" noOfLines={0}>
              본인이 소유하고 있는 아이템을 선택해주세요.
            </CommonText>
            <CommonButton type="custom" onClick={() => onOpen()} />
          </Box>
        </Wrapper>

        <CommonButton type="mdFull">생성 완료</CommonButton>
      </Container>
      <CommonDrawer
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        onClickFooterButton={() => {
          onClose();
        }}
        isFull={true}
        footerButtonText="선택 완료"
      >
        <InventorySelectItem />
      </CommonDrawer>
    </>
  );
};
export default InventoryCreate;
