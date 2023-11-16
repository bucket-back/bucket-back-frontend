import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { CommonIcon, CommonText } from '@/shared/components';
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
  const handleClick = (type: string) => {
    if (isSamePath(type)) {
      return;
    }
    // 추후 페이지 이동 + 아이콘 클릭하면 페이지 상단으로 올라갈수있도록 로직 추가
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
        navigate('/bucket/create');
        break;
      }
      case 'item': {
        navigate('/item');
        break;
      }
      case 'user': {
        // navigate(`/user/${:userId}`);
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
