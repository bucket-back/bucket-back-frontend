import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDrawer,
  CommonImage,
  CommonInput,
  CommonText,
  Header,
} from '@/shared/components';
import { useDrawer, useUserInfo } from '@/shared/hooks';
import { Container, ContentsPanel, ContentsWrapper, Form, SelectedItemsBox } from './style';
import { BucketUpateItem } from '@/features/bucket/components';
import { bucketQueryOption } from '@/features/bucket/service';
import { HobbyRadio } from '@/features/hobby/components';
import { itemQueryOption } from '@/features/item/service';

interface SelectedItem {
  id: number;
  image: string;
}

// TODO 제대로 작동을 안함

const BucketUpdate = () => {
  const { isOpen, onOpen, onClose } = useDrawer();
  const userInfo = useUserInfo();
  const { bucketId, hobby } = useParams();

  const bucket = useQuery(
    bucketQueryOption.detail({ nickname: userInfo?.nickname || '', bucketId: Number(bucketId) })
  );

  const items = useQuery(itemQueryOption.myItems({ hobbyName: hobby || 'basketball' }));

  const initialItems = bucket.data?.itemInfos.reduce<SelectedItem[]>((acc, cur) => {
    return [...acc, { id: cur.id, image: cur.image }];
  }, []);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(initialItems || []);

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">버킷 수정하기</CommonText>
        <Form>
          <ContentsWrapper>
            <ContentsPanel>
              <CommonText type="normalInfo">버킷 이름</CommonText>
              <CommonInput placeholder="버킷 이름을 입력해주세요" type="text" width="full" />
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">선택한 취미입니다.</CommonText>
              {bucket.isSuccess && <HobbyRadio defaultValue={bucket.data.hobby} isReadOnly />}
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">선택한 아이템입니다.</CommonText>
              <SelectedItemsBox>
                {selectedItems && selectedItems.length > 0 ? (
                  selectedItems.map((item) => (
                    <CommonImage key={item.id} size="sm" src={item.image} onClick={onOpen} />
                  ))
                ) : (
                  <CommonButton type="custom" onClick={onOpen} />
                )}
              </SelectedItemsBox>
            </ContentsPanel>
          </ContentsWrapper>
          <CommonButton type="mdFull" isSubmit>
            수정 완료
          </CommonButton>
        </Form>
        <CommonDrawer
          isOpen={isOpen}
          onClose={onClose}
          onClickFooterButton={onClose}
          isFull
          footerButtonText="선택 완료"
        >
          {items.isSuccess && (
            <BucketUpateItem
              items={items.data}
              onClick={setSelectedItems}
              selectedItems={selectedItems.map(({ id }) => id)}
            />
          )}
        </CommonDrawer>
      </Container>
    </>
  );
};

export default BucketUpdate;
