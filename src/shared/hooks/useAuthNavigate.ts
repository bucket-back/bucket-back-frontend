import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '.';

export const AuthContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});

const useAuthNavigate = () => {
  const isLogin = useAuthCheck();
  const setDrawer = useContext(AuthContext);
  const navigate = useNavigate();

  return (path: string) => {
    if (isLogin) {
      navigate(path);
    } else {
      setDrawer(true);
    }
  };
};

export default useAuthNavigate;
