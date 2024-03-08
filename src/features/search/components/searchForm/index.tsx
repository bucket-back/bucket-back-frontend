import { useEffect, useRef, useState, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonInput, CommonIcon, CommonIconButton } from '@/shared/components';
import { useDebounce } from '../../hooks';
import { Form } from './style';
import { searchLocalStorage } from '@/features/search/service';

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
  } = useForm<SearchProps>({
    values: { keyword: currentKeyword },
  });

  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const keyword = useDebounce(watch(['keyword']), 300);

  const { pathname } = useLocation();

  const isCancelIcon = keyword && keyword.length >= 1;

  const onSubmit: SubmitHandler<SearchProps> = (data, event) => {
    event?.preventDefault();
    const { keyword } = data;
    if (keyword.length === 0) {
      return;
    }
    searchLocalStorage(keyword);
    onInput && onInput(keyword);
    navigate(`/search/result?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleClick = () => {
    onInput && onInput('');
    navigate('/search');
  };

  const handleDocumentClick = useCallback(() => {
    (event: MouseEvent) => {
      if (formRef.current?.contains(event.target as Node) === false && isFocus) {
        setIsFocus(false);
      }
    };
  }, [isFocus]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isFocus, handleDocumentClick]);

  useEffect(() => {
    if (currentKeyword !== keyword) {
      if (pathname.includes('/result')) {
        navigate('/search');
      }
      onInput && onInput(keyword);
    }
  }, [keyword, currentKeyword, pathname, navigate, onInput]);

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
        {...register('keyword', { minLength: 1, required: '한글자 이상 입력해주세요!' })}
      />
    </Form>
  );
};

export default SearchForm;
