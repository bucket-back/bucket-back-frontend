import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonImage, CommonText, Header } from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import { Container, ContentsBox, ContentsWrapper, TitlePanel, TitleWrapper } from './style';
import { bucketQueryOption } from '@/features/bucket/service';

const BucketDetail = () => {
  const { nickname, bucketId } = useParams();
  const navigate = useNavigate();

  const buckDetail = useQuery(
    bucketQueryOption.detail({ nickname: nickname!, bucketId: Number(bucketId) })
  );

  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <TitlePanel>
            <CommonText type="normalTitle">{buckDetail.data?.name}</CommonText>
            <CommonText type="normalTitle">아이템 전체보기</CommonText>
            <CommonText type="subStrongInfo">
              총 {buckDetail.data?.itemInfos.length || 0}개의 아이템
            </CommonText>
          </TitlePanel>
          <CommonIconButton type="update" onClick={() => {}} />
        </TitleWrapper>
        {buckDetail.isSuccess && (
          <ContentsWrapper>
            {buckDetail.data.itemInfos.map(({ id, image, name, price }) => (
              <ContentsBox key={id} onClick={() => navigate(`/item/${id}`)}>
                <CommonImage size="sm" src={image} />
                <CommonText type="smallInfo">{name}</CommonText>
                <CommonText type="smallInfo">{formatNumber(price)}원</CommonText>
              </ContentsBox>
            ))}
          </ContentsWrapper>
        )}
      </Container>
    </>
  );
};

export default BucketDetail;
