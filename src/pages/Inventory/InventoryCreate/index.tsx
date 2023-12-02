import { useState } from 'react';
import { CommonButton, CommonDrawer, CommonImage, CommonText, Header } from '@/shared/components';
import { useCustomToast, useDrawer } from '@/shared/hooks';
import { Box, Container, Grid, GridItem, RadioBox, Wrapper } from './style';
import HobbySelector from '@/features/hobby/components/HobbySelector';
import InventorySelectItem from '@/features/inventory/components/InventorySelectItem';
import { useCreateInventory } from '@/features/inventory/hook';
import { SelectedItem } from '@/features/inventory/service';

interface Hobby {
  english: string;
  hangul: string;
}

const InventoryCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<Hobby>({ english: '', hangul: '' });
  const [prevSelectedHobby, setPrevSelectedHobby] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { isOpen, onOpen, onClose } = useDrawer();
  const { mutate: createInventoryMutate } = useCreateInventory();
  const openToast = useCustomToast();

  const onSubmit = () => {
    const itemIds = selectedItems.map((item) => item.id);
    if (selectedHobby.english === prevSelectedHobby) {
      createInventoryMutate({
        hobbyValue: selectedHobby.hangul,
        itemIds,
      });
    } else {
      openToast({
        type: 'error',
        message: `${selectedHobby.hangul}취미에 맞는 아이템을 선택해주세요.`,
      });
    }
  };

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
            <RadioBox>
              <HobbySelector onChange={setSelectedHobby} />
            </RadioBox>
          </Box>
          <Box>
            <CommonText type="normalInfo" noOfLines={0}>
              리뷰한 아이템을 선택해주세요.
            </CommonText>
            {selectedItems.length < 1 ? (
              <CommonButton
                type="custom"
                onClick={() => {
                  !selectedHobby.english
                    ? openToast({ type: 'info', message: '취미를 선택해주세요.' })
                    : onOpen();
                }}
              />
            ) : (
              <Grid>
                {selectedItems.map(({ id, src }) => (
                  <GridItem key={id}>
                    <CommonImage
                      border="1px solid #e2e8f0 "
                      src={src}
                      size="sm"
                      onClick={() => {
                        onOpen();
                        setSelectedItems([]);
                      }}
                    />
                  </GridItem>
                ))}
              </Grid>
            )}
          </Box>
        </Wrapper>

        <CommonButton
          type="mdFull"
          onClick={onSubmit}
          isDisabled={!selectedHobby || !selectedItems.length}
        >
          생성 완료
        </CommonButton>
      </Container>
      <CommonDrawer
        isOpen={isOpen}
        onClose={() => {
          setSelectedItems([]);
          onClose();
        }}
        onClickFooterButton={() => {
          setPrevSelectedHobby(selectedHobby.english);
          onClose();
        }}
        isFull={true}
        footerButtonText="선택 완료"
        isDisabled={selectedItems.length < 1}
      >
        <InventorySelectItem
          selectedHobby={selectedHobby.english}
          onChange={setSelectedItems}
          selectedItems={selectedItems}
        />
      </CommonDrawer>
    </>
  );
};
export default InventoryCreate;
