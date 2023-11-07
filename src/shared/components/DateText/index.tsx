import { Text } from '@chakra-ui/react';

interface DateTextProps {
  createdDate: string;
}

const DateText = ({ createdDate }: DateTextProps) => {
  const DATE = new Date(createdDate);
  console.log(DATE);
  const [month, date, hours, minutes] = [
    DATE.getMonth() + 1,
    DATE.getDate(),
    DATE.getHours(),
    DATE.getMinutes(),
  ];

  return <Text fontSize="0.75rem" color="gray.400">{`${month}/${date} ${hours}:${minutes}`}</Text>;
};

export default DateText;
