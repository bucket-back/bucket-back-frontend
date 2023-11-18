import styled from '@emotion/styled';
import {
  CommonAvatar,
  CommonButton,
  // CommonInput,
  CommonText,
  // CommonTextarea,
  Header,
} from '@/shared/components';

const MemberEdit = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">프로필 수정</CommonText>
        <Form>
          <div>
            <ImageWrapper>
              <CommonText type="strongInfo">프로필 사진</CommonText>
              <CommonAvatar isOwner />
            </ImageWrapper>

            <InputWrapper>
              <CommonText type="strongInfo">닉네임</CommonText>
              <InputBox>
                {/* <CommonInput /> */}
                <CommonButton type="mdBase">중복 확인</CommonButton>
              </InputBox>
            </InputWrapper>
            <TextareaWrapper>
              <CommonText type="strongInfo">자기소개</CommonText>
              {/* <CommonTextarea size="base" /> */}
            </TextareaWrapper>
          </div>

          <ButtonWrapper>
            <CommonButton type="smText">비밀번호 변경하기</CommonButton>
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

const Container = styled.div`
  height: 100%;
  padding: 0 3.5rem;
`;

const Form = styled.form`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ImageWrapper = styled.div``;

const InputWrapper = styled.div``;

const InputBox = styled.div`
  display: flex;
  align-items: start;
`;

const TextareaWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
