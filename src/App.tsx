import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

const App = () => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
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
`;
