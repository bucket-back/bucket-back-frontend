import { CommonText, Header } from '@/shared/components';
import { Container } from './style';
import NotImage from '@/assets/images/404_error.png';

const NotFound = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <img src={NotImage} alt="not_found" height="50%" />
        <CommonText type="smallTitle">잘못된 페이지 입니다.</CommonText>
      </Container>
    </>
  );
};

export default NotFound;
