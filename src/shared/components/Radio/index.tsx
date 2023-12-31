import { HStack, useRadioGroup } from '@chakra-ui/react';
import RadioCard from './RadioCard';
import { HobbyBox } from './style';

// 관심사(name)
// value(배열형태로) -> 몇개 들어올지 알수 있다
// color? -> 이 색으로 유지할꺼면 이 컴포넌트 안에서 그대로 수행
// isClick -> 선택된게 있는지 확인
// onClick -> 상태 변경
// 디바운스 필요

interface CommonRadioProps {
  values: string[];
  name: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
}

const CommonRadio = ({
  values,
  defaultValue,
  name,
  onChange,
  isReadOnly = false,
}: CommonRadioProps) => {
  const options = [...values];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });

        return (
          <HobbyBox key={value}>
            <RadioCard {...radio} isReadOnly={isReadOnly}>
              {value}
            </RadioCard>
          </HobbyBox>
        );
      })}
    </HStack>
  );
};

export default CommonRadio;
