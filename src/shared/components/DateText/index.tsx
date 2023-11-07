import { Text } from '@chakra-ui/react';

interface DateTextProps {
  createdDate: string;
}

const DateText = ({ createdDate }: DateTextProps) => {
  const dt = new Date(createdDate);
  const [month, date, hours, minutes] = [
    dt.getMonth() + 1,
    dt.getDate(),
    dt.getHours(),
    dt.getMinutes(),
  ];

  return <Text fontSize="0.75rem" color="gray.400">{`${month}/${date} ${hours}:${minutes}`}</Text>;
};

export default DateText;
