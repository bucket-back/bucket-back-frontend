import { useLocation } from 'react-router-dom';

const useSamePath = () => {
  const location = useLocation();
  const isSamePath = (path: string) => {
    // bucket생성 -> 버킷생성일때
    if (location.pathname.slice(1).split('/')[0] === path) {
      return true;
    }
    if (
      path === 'home' &&
      (!location.pathname.slice(1).length ||
        location.pathname.slice(1) === 'vote' ||
        location.pathname.slice(1) === 'feed')
    ) {
      return true;
    }

    return location.pathname.slice(1) === path;
  };

  return isSamePath;
};

export default useSamePath;
