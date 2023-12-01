import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonText, DividerImage } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { bucketQueryOption } from '../../service';
import { BucketBox, BucketWrapper, Container, NoResult, TotalCountWrapper } from './style';

interface BucketListProps {
  nickname: string;
  hobby: string;
}

const BucketList = ({ nickname, hobby }: BucketListProps) => {
  const navigate = useNavigate();

  const bucket = useInfiniteQuery(bucketQueryOption.list({ nickname, hobby, size: 18 }));

  const observedRef = useIntersectionObserver({ onObserve: bucket.fetchNextPage });

  if (bucket.isPending) {
    return;
  }

  if (bucket.isError) {
    return;
  }

  if (bucket.data.pages[0].buckets.length === 0) {
    return <NoResult>버킷이 없습니다.</NoResult>;
  }

  return (
    <Container>
      <TotalCountWrapper>
        <CommonText type="smallInfo">
          총 {bucket.data.pages[0].totalBucketCount}개의 버킷
        </CommonText>
      </TotalCountWrapper>
      <BucketWrapper>
        {bucket.data.pages.map((page) =>
          page.buckets.map((bucket) => (
            <BucketBox key={bucket.bucketId} onClick={() => navigate(`./${bucket.bucketId}`)}>
              <DividerImage type="base" images={bucket.itemImages.map(({ imgUrl }) => imgUrl)} />
              <CommonText type="smallInfo">{bucket.name}</CommonText>
              <CommonText type="smallInfo">{formatNumber(bucket.totalPrice)}</CommonText>
            </BucketBox>
          ))
        )}
        {bucket.hasNextPage && <div ref={observedRef} />}
      </BucketWrapper>
    </Container>
  );
};

export default BucketList;
