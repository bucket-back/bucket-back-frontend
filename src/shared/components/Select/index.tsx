import { ChangeEventHandler } from 'react';
import { Select } from '@chakra-ui/react';

interface CommonSelectProps {
  width?: `${number}rem`;
  height?: `${number}rem`;
  fontSize?: `${number}rem`;
  selectedValue?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const CommonSelect = ({
  width = '6rem',
  height = '1.9rem',
  fontSize = '1rem',
  selectedValue,
  onChange,
}: CommonSelectProps) => {
  return (
    <Select w={width} h={height} fontSize={fontSize} value={selectedValue} onChange={onChange}>
      <option value="recent">최신순</option>
      <option value="popularity">인기순</option>
    </Select>
  );
};

export default CommonSelect;
