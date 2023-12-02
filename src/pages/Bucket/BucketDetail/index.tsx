import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDrawer, CommonImage, CommonMenu, CommonText, Header } from '@/shared/components';
import { useDrawer, useUserInfo } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  Container,
  ContentsBox,
  ContentsWrapper,
  ImageBorder,
  TitlePanel,
  TitleWrapper,
} from './style';
import { useDeleteBucket } from '@/features/bucket/hooks';
import { bucketQueryOption } from '@/features/bucket/service';
import { hobbyQueryOption } from '@/features/hobby/service';

const BucketDetail = () => {
  const { nickname, bucketId } = useParams();
  const navigate = useNavigate();
  const userInfo = useUserInfo();

  const buckDetail = useQuery(
    bucketQueryOption.detail({ nickname: nickname!, bucketId: Number(bucketId) })
  );

  const hobby = useQuery({
    ...hobbyQueryOption.all(),
    select: (data) =>
      data.hobbies.reduce<Record<string, string>>(
        (acc, cur) => ((acc[cur.value] = cur.name), acc),
        {}
      ),
  });

  const { isOpen, onOpen, onClose } = useDrawer();
  const deleteBucket = useDeleteBucket();

  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <TitlePanel>
            <CommonText type="normalTitle">{buckDetail.data?.name}</CommonText>
            <div>
              <CommonText type="smallTitle">아이템 전체보기</CommonText>
              <CommonText type="normalInfo">
                총 {buckDetail.data?.itemInfos.length || 0}개의 아이템
              </CommonText>
            </div>
          </TitlePanel>
          {userInfo?.nickname === nickname && (
            <CommonMenu
              type="update"
              iconSize="0.35rem"
              onDelete={onOpen}
              onUpdate={() => {
                if (hobby.isSuccess && buckDetail.isSuccess) {
                  navigate(`/bucket/${bucketId}/edit?hobby=${hobby.data[buckDetail.data?.hobby]}`);
                }
              }}
            />
          )}
        </TitleWrapper>
        {buckDetail.isSuccess && (
          <ContentsWrapper>
            {buckDetail.data.itemInfos.map(({ id, image, name, price }) => (
              <ContentsBox key={id} onClick={() => navigate(`/item/${id}`)}>
                <ImageBorder>
                  <CommonImage size="sm" src={image} />
                </ImageBorder>
                <CommonText type="smallInfo">{name}</CommonText>
                <CommonText type="smallInfo">{formatNumber(price)}</CommonText>
              </ContentsBox>
            ))}
          </ContentsWrapper>
        )}
      </Container>
      <CommonDrawer
        isOpen={isOpen}
        onClose={onClose}
        isFull={false}
        isCloseButton={false}
        onClickFooterButton={() => {
          deleteBucket.mutate(Number(bucketId));
          if (hobby.isSuccess && buckDetail.isSuccess) {
            navigate(`/member/${nickname}/bucket?hobby=${hobby.data[buckDetail.data?.hobby]}`, {
              replace: true,
            });
          } else {
            navigate(`/member/${nickname}/bucket`, { replace: true });
          }
        }}
      >
        정말로 버킷을 삭제하시겠습니까?
      </CommonDrawer>
    </>
  );
};

export default BucketDetail;
