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

interface FeedSelectBucketProps {
  onClick: (id: number) => void;
}

const data = {
  nextCursorId: '2023110117232992516800000001',
  bucketCursorSummaries: [
    {
      cursorId: '2023110117244939600300000002',
      bucketId: 4,
      name: '유러피안 농구2',
      budget: 100000,
      itemImages: [
        {
          id: 2,
          imgUrl:
            'https://search.shopping.naver.com/catalog/38077882380?&NaPm=ct%3Dlo5yq014%7Cci%3D713dbd59d82202d06e1b90405a4ea5e378ef2845%7Ctr%3Daifc%7Csn%3D95694%7Chk%3Dcccdacdc2fc45cb886ee03a29517e0fe2806c30a',
        },
        {
          id: 1,
          imgUrl:
            'https://search.shopping.naver.com/catalog/28387288564?cat_id=50001440&frm=NVSCPRO&query=%EB%86%8D%EA%B5%AC%EA%B3%B5&NaPm=ct%3Dlo5yg6mw%7Cci%3Dc7b4d879261de032b36ef133d1c8dad0c09f90c0%7Ctr%3Dsls%7Csn%3D95694%7Chk%3D7fe52870e0afdf72ae8313b2bc965076f54b7928',
        },
      ],
    },
    {
      cursorId: '2023110117232992516800000001',
      bucketId: 3,
      name: '유러피안 농구3',
      budget: 100000,
      itemImages: [
        {
          id: 1,
          imgUrl:
            'https://search.shopping.naver.com/catalog/28387288564?cat_id=50001440&frm=NVSCPRO&query=%EB%86%8D%EA%B5%AC%EA%B3%B5&NaPm=ct%3Dlo5yg6mw%7Cci%3Dc7b4d879261de032b36ef133d1c8dad0c09f90c0%7Ctr%3Dsls%7Csn%3D95694%7Chk%3D7fe52870e0afdf72ae8313b2bc965076f54b7928',
        },
      ],
    },
    {
      cursorId: '2023110117244939600300000002',
      bucketId: 2,
      name: '유러피안 농구2',
      budget: 100000,
      itemImages: [
        {
          id: 2,
          imgUrl:
            'https://search.shopping.naver.com/catalog/38077882380?&NaPm=ct%3Dlo5yq014%7Cci%3D713dbd59d82202d06e1b90405a4ea5e378ef2845%7Ctr%3Daifc%7Csn%3D95694%7Chk%3Dcccdacdc2fc45cb886ee03a29517e0fe2806c30a',
        },
        {
          id: 1,
          imgUrl:
            'https://search.shopping.naver.com/catalog/28387288564?cat_id=50001440&frm=NVSCPRO&query=%EB%86%8D%EA%B5%AC%EA%B3%B5&NaPm=ct%3Dlo5yg6mw%7Cci%3Dc7b4d879261de032b36ef133d1c8dad0c09f90c0%7Ctr%3Dsls%7Csn%3D95694%7Chk%3D7fe52870e0afdf72ae8313b2bc965076f54b7928',
        },
      ],
    },
    {
      cursorId: '2023110117232992516800000001',
      bucketId: 1,
      name: '유러피안 농구3',
      budget: 100000,
      itemImages: [
        {
          id: 1,
          imgUrl:
            'https://search.shopping.naver.com/catalog/28387288564?cat_id=50001440&frm=NVSCPRO&query=%EB%86%8D%EA%B5%AC%EA%B3%B5&NaPm=ct%3Dlo5yg6mw%7Cci%3Dc7b4d879261de032b36ef133d1c8dad0c09f90c0%7Ctr%3Dsls%7Csn%3D95694%7Chk%3D7fe52870e0afdf72ae8313b2bc965076f54b7928',
        },
      ],
    },
  ],
};

interface ItemImages {
  id: number;
  imgUrl: string;
}

const reduceImgUrl = (itemImages: ItemImages[]) => {
  return itemImages.reduce<string[]>((acc, cur) => [...acc, cur.imgUrl], []);
};

const FeedSelectBucket = ({ onClick }: FeedSelectBucketProps) => {
  return (
    <Container>
      <ContentsWrapper>
        <CommonText type="normalTitle">버킷 선택하기</CommonText>
        <CommonText type="subStrongInfo">
          총 {data.bucketCursorSummaries.length}개의 버킷
        </CommonText>
      </ContentsWrapper>
      {data.bucketCursorSummaries.length > 0 ? (
        <BucketListWrapper>
          {data.bucketCursorSummaries.map((bucket) => (
            <BucketBox key={bucket.bucketId} onClick={() => onClick(bucket.bucketId)}>
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
