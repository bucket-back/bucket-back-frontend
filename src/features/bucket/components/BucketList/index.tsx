import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonText, DividerImage } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { bucketQueryOption } from '../../service';
import { BucketWrapper, Container, NoResult } from './style';

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
      {bucket.data.pages.map((page) =>
        page.buckets.map((bucket) => (
          <BucketWrapper key={bucket.bucketId} onClick={() => navigate(`./${bucket.bucketId}`)}>
            <DividerImage type="base" images={bucket.itemImages.map(({ imgUrl }) => imgUrl)} />
            <CommonText type="smallInfo">{bucket.name}</CommonText>
            <CommonText type="smallInfo">{formatNumber(bucket.totalPrice)}</CommonText>
          </BucketWrapper>
        ))
      )}
      {bucket.hasNextPage && <div ref={observedRef} />}
    </Container>
  );
};

export default BucketList;
