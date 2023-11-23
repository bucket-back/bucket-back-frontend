import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CommonButton, CommonDrawer, CommonRadio, CommonText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Box, Container, RadioBox, Wrapper } from './style';
import { useHobby } from '@/features/hobby/hooks';
import InventorySelectItem from '@/features/inventroy/components/InventorySelectItem';
import { inventoryQueryOption } from '@/features/inventroy/service';

const InventoryCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<string>('');
  const { data: hobbyData } = useHobby();
  const { isOpen, onOpen, onClose } = useDrawer();
  const HangulHobby = hobbyData?.hobbies.map((hobby) => hobby.value);
  const currnetHobby = hobbyData?.hobbies.find(({ value }) => value === selectedHobby);
  const { data: myItemsData } = useQuery({
    ...inventoryQueryOption.myItems({ hobbyName: currnetHobby?.name }),
  });
  console.log(myItemsData);

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
                  setSelectedHobby(value);
                }}
              />
            </RadioBox>
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
