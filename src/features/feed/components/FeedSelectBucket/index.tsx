import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonText,
  DividerImage,
} from '@/shared/components';
import {
  Container,
  ContentsWrapper,
  BucketListWrapper,
  BucketBox,
  AddBucketButtonBox,
} from './style';
import { GetBucketsResponse } from '@/features/bucket/service';

interface FeedSelectBucketProps {
  selectedBucket: number;
  bucketList: GetBucketsResponse;
  onClick: (id: number) => void;
}

interface ItemImages {
  id: number;
  imgUrl: string;
}

const reduceImgUrl = (itemImages: ItemImages[]) => {
  return itemImages.reduce<string[]>((acc, cur) => [...acc, cur.imgUrl], []);
};

const FeedSelectBucket = ({ selectedBucket, bucketList, onClick }: FeedSelectBucketProps) => {
  return (
    <Container>
      <ContentsWrapper>
        <CommonText type="normalTitle">버킷 선택하기</CommonText>
        <CommonText type="subStrongInfo">총 {bucketList.buckets.length}개의 버킷</CommonText>
      </ContentsWrapper>
      {bucketList.buckets.length > 0 ? (
        <BucketListWrapper>
          {bucketList.buckets.map((bucket) => (
            <BucketBox
              style={{ border: selectedBucket === bucket.bucketId ? '1px solid' : undefined }}
              key={bucket.bucketId}
              onClick={() => onClick(bucket.bucketId)}
            >
              <DividerImage images={reduceImgUrl(bucket.itemImages)} type="base" />
              <CommonText type="smallInfo">{bucket.name}</CommonText>
            </BucketBox>
          ))}
        </BucketListWrapper>
      ) : (
        <>
          <CommonDivider size="sm" />
          <ContentsWrapper>
            <CommonText type="smallInfo">취미에 맞는 버킷이 없습니다!</CommonText>
            <AddBucketButtonBox>
              <CommonButton type="text">버킷 추가하러 가기</CommonButton>
              <CommonIcon type="chevronRight" />
            </AddBucketButtonBox>
          </ContentsWrapper>
        </>
      )}
    </Container>
  );
};

export default FeedSelectBucket;
