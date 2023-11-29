import { useQuery } from '@tanstack/react-query';
import { CommonRadio } from '@/shared/components';
import { hobbyQueryOption } from '../../service';
import { Container } from './style';
interface Hobby {
  english: string;
  hangul: string;
}

interface HobbyRadioProps {
  defaultValue?: string;
  onChange?: React.Dispatch<React.SetStateAction<Hobby>>;
  isReadOnly?: boolean;
}

const HobbySelector = ({ defaultValue, onChange, isReadOnly }: HobbyRadioProps) => {
  const { data, isPending, isError } = useQuery({
    ...hobbyQueryOption.all(),
    select: (data) =>
      data.hobbies.reduce<Record<string, string>>(
        (acc, cur) => ((acc[cur.value] = cur.name), acc),
        {}
      ),
  });

  if (isPending) {
    return;
  }

  if (isError) {
    return;
  }

  const hangulHobby = Object.keys(data);

  const handleChange = (value: string) => {
    onChange &&
      onChange({
        english: data[value],
        hangul: value,
      });
  };

  return (
    <Container>
      <CommonRadio
        values={hangulHobby}
        name="취미"
        onChange={(value: string) => handleChange(value)}
        defaultValue={defaultValue}
        isReadOnly={isReadOnly}
      />
    </Container>
  );
};

export default HobbySelector;
