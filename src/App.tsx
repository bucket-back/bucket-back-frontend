import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { CommonDrawer } from './shared/components';
import { AuthContext } from './shared/hooks/useAuthNavigate';

const App = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AuthContext.Provider value={setOpen}>
        <AppContainer>
          <Outlet />
        </AppContainer>
      </AuthContext.Provider>
      <CommonDrawer
        isOpen={isOpen}
        isFull={false}
        isCloseButton={false}
        onClose={() => setOpen(false)}
        onClickFooterButton={() => {
          navigate('/login');
          setOpen(false);
        }}
      >
        로그인하시겠습니까?
      </CommonDrawer>
    </>
  );
};

export default App;

const AppContainer = styled.div`
  max-width: 26.875rem;
  width: 100%;
  height: 100vh;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  overflow: hidden;
`;
