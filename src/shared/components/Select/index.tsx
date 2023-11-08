import { ChangeEventHandler } from 'react';
import { Select } from '@chakra-ui/react';

interface CommonSelectProps {
  width?: `${number}rem`;
  height?: `${number}rem`;
  fontSize?: `${number}rem`;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const CommonSelect = ({
  width = '6rem',
  height = '1.9rem',
  fontSize = '1rem',
  onChange,
}: CommonSelectProps) => {
  return (
    <Select w={width} h={height} fontSize={fontSize} onChange={onChange}>
      <option value="latest">최신순</option>
      <option value="popularity">인기순</option>
    </Select>
  );
};

export default CommonSelect;
