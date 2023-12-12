import { Dispatch, SetStateAction } from 'react';
import { CommonText, CommonButton, CommonImage } from '@/shared/components';
import { useCustomToast } from '@/shared/hooks';
import { SelectedHobby, SelectedItem } from '@/shared/types';
import { Grid, GridItem, RadioBox, Wrapper } from './style';
import { HobbySelector } from '@/features/hobby/components';

interface CreateTemplateProps {
  selectedHobby: SelectedHobby;
  setSelectedHobby: Dispatch<SetStateAction<SelectedHobby>>;
  selectedItems: SelectedItem[];
  setSelectedItems: Dispatch<SetStateAction<SelectedItem[]>>;
  onOpen: () => void;
  type: 'vote' | 'inventory';
}

const CreateTemplate = ({
  setSelectedHobby,
  selectedHobby,
  selectedItems,
  setSelectedItems,
  onOpen,
  type,
}: CreateTemplateProps) => {
  const openToast = useCustomToast();

  const selection = {
    vote: '아이템을 두개 선택해주세요.',
    inventory: '리뷰한 아이템을 선택해주세요.',
  };

  return (
    <>
      <Wrapper>
        <CommonText type="normalInfo" noOfLines={0}>
          {type === 'inventory' && (
            <>
              취미별 인벤토리를 생성할 수 있습니다.
              <br />
            </>
          )}
          취미를 선택해주세요.
        </CommonText>
        <RadioBox>
          <HobbySelector onChange={setSelectedHobby} />
        </RadioBox>
      </Wrapper>
      <Wrapper>
        <CommonText type="normalInfo" noOfLines={0}>
          {selection[type]}
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
      </Wrapper>
    </>
  );
};

export default CreateTemplate;
