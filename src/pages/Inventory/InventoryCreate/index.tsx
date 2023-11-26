import { useState } from 'react';
import { CommonButton, CommonDrawer, CommonImage, CommonText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
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
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { isOpen, onOpen, onClose } = useDrawer();
  const { mutate: createInventoryMutate } = useCreateInventory();

  const onSubmit = () => {
    const itemIds = selectedItems.map((item) => item.id);
    createInventoryMutate({
      hobbyValue: selectedHobby.hangul,
      itemIds,
    });
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
              <HobbySelector onChange={setSelectedHobby} setSelectedItems={setSelectedItems} />
            </RadioBox>
          </Box>
          <Box>
            <CommonText type="normalInfo" noOfLines={0}>
              본인이 소유하고 있는 아이템을 선택해주세요.
            </CommonText>
            {selectedItems.length < 1 ? (
              <CommonButton type="custom" onClick={onOpen} />
            ) : (
              <Grid>
                {selectedItems.map(({ id, src }) => (
                  <GridItem key={id}>
                    <CommonImage
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
        onClickFooterButton={onClose}
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
