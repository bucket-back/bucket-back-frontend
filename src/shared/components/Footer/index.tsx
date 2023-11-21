import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { CommonIcon, CommonText } from '@/shared/components';
import { useAuthNavigate, useUserInfo } from '@/shared/hooks';
import useSamePath from '@/shared/hooks/useSamePath';
import { COMMON } from '@/shared/styles/Common';

const FOOTER_INFO = [
  {
    ICON: 'home',
    TEXT: '홈',
  },
  {
    ICON: 'search',
    TEXT: '검색',
  },
  {
    ICON: 'bucket',
    TEXT: '버킷생성',
  },
  {
    ICON: 'item',
    TEXT: '아이템목록',
  },
  {
    ICON: 'user',
    TEXT: 'MY',
  },
];

interface FooterProps {
  children?: ReactNode;
}

type FooterIcon = 'home' | 'search' | 'bucket' | 'item' | 'user';

const Footer = ({ children }: FooterProps) => {
  const navigate = useNavigate();
  const isSamePath = useSamePath();
  const userInfo = useUserInfo();
  const authNavigate = useAuthNavigate();
  const handleClick = (type: string) => {
    if (isSamePath(type)) {
      return;
    }

    switch (type) {
      case 'home': {
        navigate('/');
        break;
      }
      case 'search': {
        navigate('/search');
        break;
      }
      case 'bucket': {
        authNavigate('/bucket/create');
        break;
      }
      case 'item': {
        authNavigate('/item');
        break;
      }
      case 'user': {
        authNavigate(`/member/${userInfo?.nickname}`);
        break;
      }
    }
  };

  return (
    <Flex
      height="5rem"
      bg={COMMON.COLORS.LIGHT_GRAY}
      alignItems="center"
      justifyContent="space-evenly"
      w="100%"
      zIndex={999}
    >
      {children}
      {FOOTER_INFO.map(({ ICON, TEXT }) => (
        <Flex
          key={ICON}
          flexDirection="column"
          alignItems="center"
          onClick={() => handleClick(ICON)}
          cursor="pointer"
        >
          <CommonIcon
            type={ICON as FooterIcon}
            size="1.5rem"
            color={isSamePath(ICON) ? 'blue.300' : 'blue.900'}
          />
          <CommonText
            type="smallInfo"
            color={isSamePath(ICON) ? 'blue.300' : 'blue.900'}
            noOfLines={0}
          >
            {TEXT}
          </CommonText>
        </Flex>
      ))}
    </Flex>
  );
};

export default Footer;
