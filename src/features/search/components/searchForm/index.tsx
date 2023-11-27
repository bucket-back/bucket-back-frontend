import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CommonInput, CommonIcon, CommonIconButton } from '@/shared/components';
import { SEARCH_KEY } from '@/shared/constants';
import { Storage } from '@/shared/utils';
import { Form } from './style';

interface SearchProps {
  keyword: string;
}

interface SearchFormProps {
  keyword: string;
  onInput?: (value: string) => void;
}

const SearchForm = ({ keyword: currentKeyword, onInput }: SearchFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<SearchProps>({ values: { keyword: currentKeyword } });

  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [keyword] = watch(['keyword']);

  const isCancelIcon = keyword && keyword.length >= 1;

  const onSubmit: SubmitHandler<SearchProps> = (data, event) => {
    event?.preventDefault();
    const { keyword } = data;
    const value = Storage.getLocalStoraged(SEARCH_KEY);
    if (!Array.isArray(value)) {
      Storage.setLocalStoraged(SEARCH_KEY, [keyword]);
      reset();

      return;
    }
    const findValue = value.findIndex((value: string) => value === keyword);
    if (findValue === -1) {
      Storage.setLocalStoraged(SEARCH_KEY, [...value, keyword]);
    } else {
      Storage.setLocalStoraged(SEARCH_KEY, [...value]);
    }
    reset();
  };

  const handleClick = () => {
    onInput && onInput('');
    navigate('/search');
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (formRef.current?.contains(event.target as Node) === false && isFocus) {
        setIsFocus(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isFocus]);

  useEffect(() => {
    if (currentKeyword !== keyword) {
      onInput && onInput(keyword);
    }
  }, [keyword]);

  return (
    <Form isFocus={isFocus} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <CommonInput
        onClick={() => setIsFocus(true)}
        placeholder="검색어를 입력해주세요!"
        error={errors.keyword}
        type="text"
        leftIcon={<CommonIcon type="search" />}
        rightIcon={
          isCancelIcon ? (
            <CommonIconButton type="cancel" onClick={() => handleClick()} />
          ) : undefined
        }
        width="full"
        bg="white"
        {...register('keyword', { minLength: 1 })}
      />
    </Form>
  );
};

export default SearchForm;
