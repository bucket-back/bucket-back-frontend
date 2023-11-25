import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CommonDivider,
  CommonIconButton,
  CommonTabs,
  CommonText,
  DividerImage,
  Header,
} from '@/shared/components';
import { useUserInfo } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  AddButtonWrapper,
  Container,
  ContentsBox,
  ContentsPanel,
  ContentsWrapper,
  NoResult,
  TitleWrapper,
} from './style';
import { bucketQueryOption } from '@/features/bucket/service';
import { hobbyQueryOption } from '@/features/hobby/service';

const BucketHome = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const hobby = useQuery({ ...hobbyQueryOption.all(), select: (data) => data.hobbies });

  const [searchParams, setSearchParams] = useSearchParams({
    hobby: hobby.isSuccess ? hobby.data[0].name : 'basketball',
  });

  const bucket = useQuery(
    bucketQueryOption.list({ nickname: nickname!, hobby: searchParams.get('hobby')! })
  );

  const currentTabIndex = hobby.data
    ?.map(({ name }) => name)
    .indexOf(searchParams.get('hobby') || hobby.data[0].name);

  return (
    <>
      <Header type="back" path={`/member/${nickname}`} />
      <Container>
        <TitleWrapper>
          <CommonText type="normalTitle">버킷</CommonText>
          <CommonText type="subStrongInfo">
            총 {bucket.data?.buckets.length || 0}개의 버킷
          </CommonText>
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
              content: (
                <ContentsWrapper>
                  {bucket.isSuccess && bucket.data.buckets.length > 0 ? (
                    <ContentsPanel>
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
                    </ContentsPanel>
                  ) : (
                    <NoResult>버킷이 없습니다.</NoResult>
                  )}
                </ContentsWrapper>
              ),
            })) || []
          }
        />
      </Container>
      {userInfo?.nickname === nickname && (
        <AddButtonWrapper>
          <CommonIconButton
            type="create"
            onClick={() => {
              navigate('/bucket/create');
            }}
          />
        </AddButtonWrapper>
      )}
    </>
  );
};

export default BucketHome;
