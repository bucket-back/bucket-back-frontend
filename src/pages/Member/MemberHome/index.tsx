import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CommonAvatar,
  CommonButton,
  CommonDivider,
  CommonDrawer,
  CommonIcon,
  CommonIconButton,
  CommonMenu,
  CommonText,
  DividerImage,
  Footer,
  Header,
} from '@/shared/components';
import { useAuthCheck, useDrawer } from '@/shared/hooks';
import {
  Container,
  MemberInfoWrapper,
  MemberIntroWrapper,
  MemberInfoPanel,
  MemberInfoBox,
  ContentsWrapper,
  ContentsPanel,
  SubTitleBox,
  ImagePanel,
  Grid,
} from './style';
import { useLeave, useLogout } from '@/features/member/hooks';
import { memberQueryOption } from '@/features/member/service';

const MemberHome = () => {
  const { nickname } = useParams();
  const isLogin = useAuthCheck();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDrawer();
  const [selectedStatus, setSelectedStatus] = useState<'leave' | 'logout'>('logout');

  const member = useQuery(memberQueryOption.detail(nickname!));
  const logout = useLogout();
  const leave = useLeave();

  return (
    <>
      <Header type="logo" />
      <Container>
        <MemberInfoWrapper>
          <MemberInfoPanel>
            <CommonAvatar size="5rem" />
            <MemberInfoBox>
              <CommonText type="strongInfo">LV. {member.data?.memberProfile.level}</CommonText>
              <CommonText type="smallTitle">{nickname}</CommonText>
              {isLogin && (
                <CommonButton type="profile" onClick={() => navigate('/member/edit')}>
                  프로필 수정
                </CommonButton>
              )}
            </MemberInfoBox>
          </MemberInfoPanel>
          {isLogin && (
            <CommonMenu
              type="logout"
              iconSize="0.3rem"
              onLogout={() => {
                setSelectedStatus('logout');
                onOpen();
              }}
              onDelete={() => {
                setSelectedStatus('leave');
                onOpen();
              }}
            />
          )}
        </MemberInfoWrapper>
        <MemberIntroWrapper>
          <CommonText type="normalInfo" noOfLines={3}>
            {member.data?.memberProfile.introduction}
          </CommonText>
        </MemberIntroWrapper>
        <CommonDivider size="lg" />
        <ContentsWrapper>
          <ContentsPanel>
            <div>
              <SubTitleBox>
                <CommonIcon type="inventory" />
                <CommonText type="smallTitle">인벤토리</CommonText>
              </SubTitleBox>
              <CommonText type="smallInfo">
                취미별 아이템을 조합하여 나만의 인벤토리를 만들 수 있어요
              </CommonText>
            </div>
            <CommonIconButton
              type="detail"
              fontSize="0.8rem"
              onClick={() => navigate(`/member/${nickname}/inventory`)}
            />
          </ContentsPanel>
          {member.isSuccess && member.data.inventoryProfiles.length > 0 && (
            <ImagePanel>
              <Grid>
                {member.data.inventoryProfiles.map((inventory) => (
                  <DividerImage key={inventory.id} type="base" images={inventory.images} />
                ))}
              </Grid>
            </ImagePanel>
          )}
        </ContentsWrapper>
        <CommonDivider size="sm" />
        <ContentsWrapper>
          <ContentsPanel>
            <div>
              <SubTitleBox>
                <CommonIcon type="bucket" />
                <CommonText type="smallTitle">버킷</CommonText>
              </SubTitleBox>
              <CommonText type="smallInfo">
                취미별 아이템을 조합하여 나만의 버킷을 만들 수 있어요
              </CommonText>
            </div>
            <CommonIconButton
              type="detail"
              fontSize="0.8rem"
              onClick={() => navigate(`/member/${nickname}/bucket`)}
            />
          </ContentsPanel>
          {member.isSuccess && member.data.bucketProfiles.length > 0 && (
            <ImagePanel>
              <Grid>
                {member.data?.bucketProfiles.map((bucket) => (
                  <DividerImage key={bucket.id} type="base" images={bucket.images} />
                ))}
              </Grid>
            </ImagePanel>
          )}
        </ContentsWrapper>
        <CommonDivider size="sm" />
        <ContentsWrapper>
          <ContentsPanel>
            <div>
              <SubTitleBox>
                <CommonIcon type="feed" />
                <CommonText type="smallTitle">피드</CommonText>
              </SubTitleBox>
              <CommonText type="smallInfo">
                내가 올린 피드와 좋아요한 피드를 확인할 수 있어요
              </CommonText>
            </div>
            <CommonIconButton
              type="detail"
              fontSize="0.8rem"
              onClick={() => navigate(`/member/${nickname}/feed`)}
            />
          </ContentsPanel>
        </ContentsWrapper>
        <CommonDivider size="sm" />
      </Container>
      <Footer />

      <CommonDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickFooterButton={() => {
          if (selectedStatus === 'logout') {
            logout();
          }

          if (selectedStatus === 'leave') {
            leave.mutate();
          }
        }}
        isFull={false}
        isCloseButton={false}
      >
        {selectedStatus === 'logout' ? '정말로 로그아웃하시겠습니까?' : '정말로 탈퇴하시겠습니까?'}
      </CommonDrawer>
    </>
  );
};

export default MemberHome;
