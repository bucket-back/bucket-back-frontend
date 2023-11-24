import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  CommonAvatar,
  CommonButton,
  CommonInput,
  CommonText,
  CommonTextarea,
} from '@/shared/components';
import { useValidateForm } from '@/shared/hooks';
import { AvatarBox, ButtonWrapper, Form, InputBox, InputWrapper } from './style';
import { useCheckNickname, useUpateMemberInfo } from '@/features/member/hooks';
import { PutMemberRequest } from '@/features/member/service';

interface MemberEditFormProps {
  nickname: string;
  introduction: string;
}

const MemberEditForm = ({ nickname, introduction }: MemberEditFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PutMemberRequest>({
    mode: 'onBlur',
    defaultValues: {
      nickname,
      introduction,
    },
  });
  const registerOptions = useValidateForm();
  const checkNickname = useCheckNickname();
  const [currentNickname] = watch(['nickname']);
  const updateMemberInfo = useUpateMemberInfo(currentNickname);

  const handleCheckNickname = () => {
    if (errors.nickname) {
      return;
    }

    checkNickname.mutate(currentNickname);
  };
  const onSubmit: SubmitHandler<PutMemberRequest> = ({ nickname, introduction }) => {
    updateMemberInfo.mutate({ nickname, introduction });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
            <CommonInput
              placeholder="닉네임을 입력해주세요"
              type="text"
              width="100%"
              error={errors.nickname}
              {...register('nickname', ...registerOptions.nickname)}
            />
            <CommonButton
              type="mdBase"
              width="object-fit"
              onClick={handleCheckNickname}
              isDisabled={checkNickname.isPending}
            >
              중복 확인
            </CommonButton>
          </InputBox>
        </div>
        <div>
          <CommonText type="strongInfo">자기소개</CommonText>
          <CommonTextarea
            placeholder="자기소개를 작성해주세요"
            size="base"
            error={errors.introduction}
            {...register('introduction')}
          />
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
  );
};

export default MemberEditForm;
