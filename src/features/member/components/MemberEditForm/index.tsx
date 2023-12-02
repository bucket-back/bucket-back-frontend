import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  CommonAvatar,
  CommonButton,
  CommonInput,
  CommonText,
  CommonTextarea,
} from '@/shared/components';
import { PROFILE_IMAGE_KEY } from '@/shared/constants';
import { useValidateForm } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import useUpdateImage from '../../hooks/useUpdateImage';
import { AvatarBox, ButtonWrapper, FileInput, Form, InputBox, InputWrapper } from './style';
import { useCheckNickname, useUpateMemberInfo } from '@/features/member/hooks';

interface MemberEditFormProps {
  nickname: string;
  image: string;
  introduction: string;
}

const MemberEditForm = ({ nickname, image, introduction }: MemberEditFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MemberEditFormProps>({
    mode: 'onBlur',
    defaultValues: {
      image: '',
      nickname,
      introduction: introduction || '',
    },
  });
  const registerOptions = useValidateForm();
  const checkNickname = useCheckNickname();
  const [currentNickname, currentImage] = watch(['nickname', 'image']);
  const updateMemberInfo = useUpateMemberInfo(currentNickname);
  const updateImage = useUpdateImage(currentNickname);

  const handleCheckNickname = () => {
    if (errors.nickname) {
      return;
    }

    checkNickname.mutate(currentNickname);
  };
  const onSubmit: SubmitHandler<MemberEditFormProps> = ({ nickname, image, introduction }) => {
    updateMemberInfo.mutate({ nickname, introduction });

    if (image) {
      updateImage.mutate({ image });
    }
  };

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (typeof currentImage !== 'string') {
      const file = currentImage[0];
      setImagePreview(URL.createObjectURL(file));
      Storage.setLocalStoraged(PROFILE_IMAGE_KEY, URL.createObjectURL(file));
    }
  }, [currentImage]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <div>
          <CommonText type="strongInfo">프로필 사진</CommonText>
          <AvatarBox>
            <CommonAvatar src={imagePreview || image || ''} isOwner>
              <FileInput type="file" {...register('image')} />
            </CommonAvatar>
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
            placeholder="자기소개를 작성해주세요 (100자 이하)"
            size="base"
            error={errors.introduction}
            {...register('introduction', {
              maxLength: {
                value: 100,
                message: '100글자 이하로 입력해주세요.',
              },
            })}
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
