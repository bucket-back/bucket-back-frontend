import { Flex } from '@chakra-ui/react';
import CommonIcon from '../Icon';
import CommonText from '../Text';

const FOOTER_INFO = [
  {
    icon: 'home',
    text: '홈',
  },
  {
    icon: 'search',
    text: '검색',
  },
  {
    icon: 'basket',
    text: '버킷생성',
  },
  {
    icon: 'bag',
    text: '아이템목록',
  },
  {
    icon: 'my',
    text: 'MY',
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
      {FOOTER_INFO.map(({ icon, text }, index) => (
        <Flex key={index} flexDirection="column" alignItems="center" onClick={handleClick}>
          <CommonIcon type={icon as FooterIcon} size="2rem" color="blue.900" />
          <CommonText type="smallInfo" color="blue.900" noOfLines={0}>
            {text}
          </CommonText>
        </Flex>
      ))}
    </Flex>
  );
};

export default Footer;
