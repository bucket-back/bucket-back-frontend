const useValidateForm = () => {
  const registerOptions = {
    password: [
      {
        required: '비밀번호 입력은 필수입니다.',
        minLength: {
          value: 6,
          message: '6글자 이상으로 입력해주세요.',
        },
        maxLength: {
          value: 10,
          message: '10글자 이하로 입력해주세요.',
        },
        pattern: {
          value: /[a-zA-Z]+/,
          message: '영문자를 1개 이상 입력해주세요.',
        },
        validate: {
          hasNumber: (v: string) => /\d+/.test(v) || '숫자를 1개 이상 입력해주세요.',
          hasAlpabet: (v: string) => /[a-zA-Z]+/.test(v) || '영문자를 1개 이상 입력해주세요.',
          hasSpecialMark: (v: string) =>
            /[!@#$%^&*()]+/.test(v) || '특수문자를 1개 이상 입력해주세요.',
        },
      },
    ],
    email: [
      {
        required: '이메일 입력은 필수입니다.',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: '이메일 형식에 맞지않습니다.',
        },
      },
    ],
    nickname: [
      {
        required: '닉네임 입력은 필수입니다.',
        minLength: {
          value: 3,
          message: '3글자 이상으로 입력해주세요.',
        },
        maxLength: {
          value: 25,
          message: '25글자 이하로 입력해주세요.',
        },
        validate: {
          onlyUnderBar: (v: string) =>
            /^[a-zA-Z0-9_]+$/.test(v) || '영문자,숫자,_조합만을 허용합니다.',
          hasAlpabet: (v: string) => /[a-zA-Z]+/.test(v) || '영문자를 1개 이상 입력해주세요.',
        },
      },
    ],
  };

  return registerOptions;
};

export default useValidateForm;
