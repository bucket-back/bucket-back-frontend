import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CommonIconButton, CommonTabs, Footer, Header } from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
import { Container, AddButtonWrapper } from './style';

const ROOT_PATH = '/';

const TABS = {
  FEED: {
    INDEX: 0,
    VALUE: 'feed',
    LABEL: '피드',
  },
  VOTE: {
    INDEX: 1,
    VALUE: 'vote',
    LABEL: '투표',
  },
};

const Home = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isVoteInPathname = pathname.includes(TABS.VOTE.VALUE);
  const authNavigate = useAuthNavigate();

  useEffect(() => {
    if (pathname === ROOT_PATH) {
      navigate(`${TABS.FEED.VALUE}`);
    }
  }, [navigate, pathname]);

  return (
    <>
      <Header type="logo" />
      <Container>
        <CommonTabs
          currentTabIndex={isVoteInPathname ? TABS.VOTE.INDEX : TABS.FEED.INDEX}
          tabsType="line"
          isFitted
          onClick={() => navigate(isVoteInPathname ? TABS.FEED.VALUE : TABS.VOTE.VALUE)}
          tabsData={[
            {
              label: TABS.FEED.LABEL,
              content: <Outlet />,
            },
            {
              label: TABS.VOTE.LABEL,
              content: <Outlet />,
            },
          ]}
        />
      </Container>
      <Footer>
        <AddButtonWrapper>
          <CommonIconButton
            type="add"
            onClick={() => {
              authNavigate(
                isVoteInPathname ? `${TABS.VOTE.VALUE}/create` : `${TABS.FEED.VALUE}/create`
              );
            }}
          />
        </AddButtonWrapper>
      </Footer>
    </>
  );
};

export default Home;
