import styled from '@emotion/styled';
import { CommonButton, CommonImage } from '@/shared/components';

const data = [
  {
    itemId: 1,
    itemName: '테스트1',
    imgUrl: 'https://via.placeholder.com/800',
  },
  {
    itemId: 2,
    itemName: '테스트2',
    imgUrl: 'https://via.placeholder.com/800',
  },
  {
    itemId: 3,
    itemName: '테스트3',
    imgUrl: 'https://via.placeholder.com/800',
  },
  {
    itemId: 4,
    itemName: '테스트4',
    imgUrl: 'https://via.placeholder.com/800',
  },
];

interface BucketItem {
  itemId: number;
  itemName: string;
  imgUrl: string;
}

interface FeedBucketDetailProps {
  bucketItems?: BucketItem[];
  onClick?: () => void;
}

const FeedBucketDetail = ({ bucketItems = data, onClick }: FeedBucketDetailProps) => {
  return (
    <Container>
      {bucketItems.map(({ itemId, itemName, imgUrl }) => (
        <ContentsWrapper key={itemId}>
          <ButtonBox>
            <CommonImage size="xs" src={imgUrl} />
            <CommonButton type="xs" onClick={onClick}>
              {itemName}
            </CommonButton>
          </ButtonBox>
          <CommonImage size="lg" src={imgUrl} onClick={onClick} />
        </ContentsWrapper>
      ))}
    </Container>
  );
};

export default FeedBucketDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1rem;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
