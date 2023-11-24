import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDrawer,
  CommonImage,
  CommonRadio,
  CommonText,
  Header,
} from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Box, Container, Grid, GridItem, RadioBox, Wrapper } from './style';
import { useHobby } from '@/features/hobby/hooks';
import InventorySelectItem from '@/features/inventory/components/InventorySelectItem';
import { useCreateInventory } from '@/features/inventory/hook';
import { inventoryQueryOption } from '@/features/inventory/service';

interface SelectedItem {
  id: string;
  src: string;
}

const InventoryCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { data: hobbyData } = useHobby();
  const { isOpen, onOpen, onClose } = useDrawer();
  const HangulHobby = hobbyData?.hobbies.map((hobby) => hobby.value);
  const currnetHobby = hobbyData?.hobbies.find(({ value }) => value === selectedHobby);
  const { mutate: createInventoryMutate } = useCreateInventory();
  const { data: myItemsData } = useQuery({
    ...inventoryQueryOption.myItems({ hobbyName: currnetHobby?.name }),
  });

  const checkingItems = (e: ChangeEvent<HTMLInputElement>, src: string) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedItems(() => [...selectedItems, { id: e.target.id, src: src }]);
    } else if (!checked) {
      setSelectedItems(selectedItems.filter(({ id }) => id !== e.target.id));
    }
  };

  const onSubmit = () => {
    const itemIds = selectedItems.map((item) => Number(item.id));
    createInventoryMutate({
      hobbyValue: selectedHobby,
      itemIds,
    });
  };

  if (!HangulHobby) {
    return;
  }

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
              <CommonRadio
                values={HangulHobby!}
                name="취미"
                onChange={(value: string) => {
                  setSelectedItems([]);
                  setSelectedHobby(value);
                }}
              />
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
        onClickFooterButton={() => {
          onClose();
        }}
        isFull={true}
        footerButtonText="선택 완료"
        isDisabled={selectedItems.length < 1}
      >
        <InventorySelectItem reviewedItems={myItemsData?.reviewedItems} onChange={checkingItems} />
      </CommonDrawer>
    </>
  );
};
export default InventoryCreate;
