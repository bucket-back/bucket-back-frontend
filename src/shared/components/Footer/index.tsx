import { Flex } from '@chakra-ui/react';
import CommonIcon from '../Icon';
import CommonText from '../Text';

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
    ICON: 'basket',
    TEXT: '버킷생성',
  },
  {
    ICON: 'bag',
    TEXT: '아이템목록',
  },
  {
    ICON: 'my',
    TEXT: 'MY',
  },
];
type FooterIcon = 'home' | 'search' | 'basket' | 'bag' | 'my';

const Footer = () => {
  const handleClick = () => {
    // 추후 페이지 이동 + 아이콘 클릭하면 페이지 상단으로 올라갈수있도록 로직 추가
  };

  return (
    <Flex
      height="5rem"
      bg="red.200"
      alignItems="center"
      justifyContent="space-evenly"
      pos="fixed"
      bottom="0"
      w="full"
      zIndex={999}
    >
      {FOOTER_INFO.map(({ ICON, TEXT }) => (
        <Flex key={ICON} flexDirection="column" alignItems="center" onClick={handleClick}>
          <CommonIcon type={ICON as FooterIcon} size="2rem" color="blue.900" />
          <CommonText type="smallInfo" color="blue.900" noOfLines={0}>
            {TEXT}
          </CommonText>
        </Flex>
      ))}
    </Flex>
  );
};

export default Footer;
