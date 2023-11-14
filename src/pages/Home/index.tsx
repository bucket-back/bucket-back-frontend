import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { CommonIconButton, CommonTabs, Footer, Header } from '@/shared/components';

const Home = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate('feed?hobby=cycle');
    }
  }, [navigate, pathname]);

  return (
    <>
      <Header type="logo" />
      <Container>
        <CommonTabs
          currentTabIndex={pathname.includes('vote') ? 1 : 0}
          tabsType="line"
          isFitted
          onClick={() => navigate(pathname.includes('vote') ? 'feed' : 'vote')}
          tabsData={[
            {
              label: '피드',
              content: <Outlet />,
            },
            {
              label: '투표',
              content: <Outlet />,
            },
          ]}
        />
      </Container>
      <Footer>
        <AddButtonWrapper>
          <CommonIconButton
            type="add"
            onClick={() => navigate(pathname.includes('vote') ? 'vote/create' : 'feed/create')}
          />
        </AddButtonWrapper>
      </Footer>
    </>
  );
};

export default Home;

const Container = styled.div`
  height: 100%;
  overflow: hidden;
`;

const AddButtonWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  right: 20px;
  z-index: 10;
`;
