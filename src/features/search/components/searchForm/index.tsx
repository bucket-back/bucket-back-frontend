import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommonInput, CommonIcon, CommonIconButton } from '@/shared/components';
import { Form } from './style';

interface SearchProps {
  keyword: string;
}

interface SearchFormProps {
  onInput?: (value: string) => void;
}

const SearchForm = ({ onInput }: SearchFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<SearchProps>();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [keyword] = watch(['keyword']);

  const onSubmit: SubmitHandler<SearchProps> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    reset();
  };

  const isCancelIcon = keyword && keyword.length >= 1;

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
    onInput && onInput(keyword);
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
          isCancelIcon ? <CommonIconButton type="cancel" onClick={() => reset()} /> : undefined
        }
        width="full"
        bg="white"
        {...register('keyword', { minLength: 1 })}
      />
    </Form>
  );
};

export default SearchForm;