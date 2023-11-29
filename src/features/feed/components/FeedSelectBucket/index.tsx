import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonText,
  DividerImage,
} from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import {
  Container,
  BucketListWrapper,
  BucketBox,
  AddBucketButtonBox,
  ImageInput,
  ImageLabel,
  AddBucketWrapper,
  TitleWrapper,
} from './style';
import { bucketQueryOption } from '@/features/bucket/service';

interface SelectedBucket {
  id: number;
  images: string[];
}

interface FeedSelectBucketProps {
  hobby: string;
  nickname: string;
  selectedBucket: number;
  onClick: React.Dispatch<React.SetStateAction<SelectedBucket | null>>;
}

interface ItemImages {
  id: number;
  imgUrl: string;
}

const reduceImgUrl = (itemImages: ItemImages[]) => {
  return itemImages.reduce<string[]>((acc, cur) => [...acc, cur.imgUrl], []);
};

const FeedSelectBucket = ({ hobby, nickname, selectedBucket, onClick }: FeedSelectBucketProps) => {
  const navigate = useNavigate();

  const bucketList = useInfiniteQuery(bucketQueryOption.list({ hobby, nickname, size: 18 }));

  const observedRef = useIntersectionObserver({ onObserve: bucketList.fetchNextPage });

  if (bucketList.isPending) {
    return;
  }

  if (bucketList.isError) {
    return;
  }

  return (
    <Container>
      <TitleWrapper>
        <CommonText type="normalTitle">버킷 선택하기</CommonText>
        <CommonText type="subStrongInfo">
          총 {bucketList.data.pages[0].buckets.length}개의 버킷
        </CommonText>
      </TitleWrapper>
      {bucketList.data.pages[0].buckets.length === 0 && (
        <>
          <CommonDivider size="sm" />
          <AddBucketWrapper>
            <CommonText type="smallInfo">취미에 맞는 버킷이 없습니다!</CommonText>
            <AddBucketButtonBox onClick={() => navigate('/bucket/create')}>
              <CommonButton type="text">버킷 추가하러 가기</CommonButton>
              <CommonIcon type="chevronRight" />
            </AddBucketButtonBox>
          </AddBucketWrapper>
        </>
      )}
      <BucketListWrapper>
        {bucketList.data.pages.map((page) =>
          page.buckets.map((bucket) => (
            <BucketBox key={bucket.bucketId}>
              <ImageInput
                type="checkbox"
                id={String(bucket.bucketId)}
                onChange={() => {
                  if (selectedBucket === bucket.bucketId) {
                    onClick(null);
                  } else {
                    onClick({ id: bucket.bucketId, images: reduceImgUrl(bucket.itemImages) });
                  }
                }}
                checked={selectedBucket === bucket.bucketId}
              />
              <ImageLabel htmlFor={String(bucket.bucketId)}>
                <DividerImage images={reduceImgUrl(bucket.itemImages)} type="base" />
              </ImageLabel>
              <CommonText type="smallInfo">{bucket.name}</CommonText>
            </BucketBox>
          ))
        )}
        {bucketList.hasNextPage && <div ref={observedRef} />}
      </BucketListWrapper>
    </Container>
  );
};

export default FeedSelectBucket;
