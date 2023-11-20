import { useNavigate } from 'react-router-dom';
import {
  CommonAvatar,
  CommonButton,
  CommonInput,
  CommonText,
  CommonTextarea,
  Header,
} from '@/shared/components';
import { Container, Form, InputWrapper, InputBox, AvatarBox, ButtonWrapper } from './style';

const MemberEdit = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">프로필 수정</CommonText>
        <Form>
          <InputWrapper>
            <div>
              <CommonText type="strongInfo">프로필 사진</CommonText>
              <AvatarBox>
                <CommonAvatar isOwner />
              </AvatarBox>
            </div>
            <div>
              <CommonText type="strongInfo">닉네임</CommonText>
              <InputBox>
                <CommonInput placeholder="닉네임을 입력해주세요" type="text" width="100%" />
                <CommonButton type="mdBase" width="object-fit">
                  중복 확인
                </CommonButton>
              </InputBox>
            </div>
            <div>
              <CommonText type="strongInfo">자기소개</CommonText>
              <CommonTextarea placeholder="자기소개를 작성해주세요" size="base" />
            </div>
          </InputWrapper>

          <ButtonWrapper>
            <CommonButton type="smText" onClick={() => navigate('./password')}>
              비밀번호 변경하기
            </CommonButton>
            <CommonButton type="mdMiddle" isSubmit={true}>
              프로필 수정
            </CommonButton>
          </ButtonWrapper>
        </Form>
      </Container>
    </>
  );
};

export default MemberEdit;
