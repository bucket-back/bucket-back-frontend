import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CommonDivider,
  CommonMenu,
  CommonTabs,
  CommonText,
  DividerImage,
  Header,
} from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import {
  Container,
  ContentsBox,
  ContentsWrapper,
  NoResult,
  TitlePanel,
  TitleWrapper,
} from './style';
import { bucketQueryOption } from '@/features/bucket/service';
import { hobbyQueryOption } from '@/features/hobby/service';

const BucketHome = () => {
  const { nickname } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const hobby = useQuery({ ...hobbyQueryOption.all(), select: (data) => data.hobbies });

  const bucket = useQuery(
    bucketQueryOption.list({ nickname: nickname!, hobby: searchParams.get('hobby')! })
  );

  const currentTabIndex = hobby.data
    ?.map(({ name }) => name)
    .indexOf(searchParams.get('hobby') || hobby.data[0].name);

  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <TitlePanel>
            <CommonText type="normalTitle">버킷</CommonText>
            <CommonText type="subStrongInfo">
              총 {bucket.data?.buckets.length || 0}개의 버킷
            </CommonText>
          </TitlePanel>
          <CommonMenu
            type="create"
            iconSize="0.35rem"
            onCreate={() => navigate('/bucket/create')}
            onDelete={() => {}}
          />
        </TitleWrapper>
        <CommonDivider size="sm" />
        <CommonTabs
          currentTabIndex={currentTabIndex}
          paddingLeftRight={2}
          tabsType="soft-rounded"
          isFitted={false}
          onClick={(value) => {
            setSearchParams({ hobby: value });
          }}
          tabsData={
            hobby.data?.map(({ name, value }) => ({
              value: name,
              label: value,
              content:
                bucket.isSuccess && bucket.data.buckets.length > 0 ? (
                  <ContentsWrapper>
                    {bucket.data.buckets.map((bucket) => (
                      <ContentsBox
                        key={bucket.bucketId}
                        onClick={() => navigate(`./${bucket.bucketId}`)}
                      >
                        <DividerImage
                          type="base"
                          images={bucket.itemImages.map(({ imgUrl }) => imgUrl)}
                        />
                        <CommonText type="smallInfo">{bucket.name}</CommonText>
                        <CommonText type="smallInfo">
                          {formatNumber(bucket.totalPrice)}원
                        </CommonText>
                      </ContentsBox>
                    ))}
                  </ContentsWrapper>
                ) : (
                  <NoResult>버킷이 없습니다.</NoResult>
                ),
            })) || []
          }
        />
      </Container>
    </>
  );
};

export default BucketHome;
