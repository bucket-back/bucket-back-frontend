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
} from './style';
import { useLogout } from '@/features/member/hooks';
import { memberQueryOption } from '@/features/member/service';

const MemberHome = () => {
  const { nickname } = useParams();
  const isLogin = useAuthCheck();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDrawer();
  const [selectedStatus, setSelectedStatus] = useState<'leave' | 'logout'>('logout');

  const member = useQuery(memberQueryOption.detail(nickname!));
  const logout = useLogout();

  return (
    <>
      <Header type="logo" />
      <Container>
        <MemberInfoWrapper>
          <MemberInfoPanel>
            <CommonAvatar size="5rem" />
            <MemberInfoBox>
              <CommonText type="strongInfo">LV. {member.data?.memberProfile.levelPoint}</CommonText>
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
            안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
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
                취미별 아이템을 조합하여 나만의 인벤토리을 만들 수 있어요
              </CommonText>
            </div>
            <CommonIconButton type="detail" fontSize="0.8rem" onClick={() => {}} />
          </ContentsPanel>
          <ImagePanel>
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
          </ImagePanel>
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
            <CommonIconButton type="detail" fontSize="0.8rem" onClick={() => {}} />
          </ContentsPanel>
          <ImagePanel>
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
          </ImagePanel>
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
            <CommonIconButton type="detail" fontSize="0.8rem" onClick={() => {}} />
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
          } else {
            // TODO: 탈퇴 기능 추가
            console.log('탈퇴');
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
