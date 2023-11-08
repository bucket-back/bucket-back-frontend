import { ReactNode } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { CommonBadge, DateText } from '@/shared/components';

interface CommonCardProps {
  count: number;
  date: string;
  children: ReactNode;
  onClick: () => void;
}

const CommonCard = ({ count, date, children, onClick }: CommonCardProps) => {
  return (
    <Card
      onClick={onClick}
      maxW="24.5rem"
      minH="16.1875rem"
      boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)"
    >
      <CardHeader p="0">
        <CommonBadge type="vote" count={count} />
      </CardHeader>
      <CardBody px="1.56rem">{children}</CardBody>
      <CardFooter justify="end">
        <DateText createdDate={date} />
      </CardFooter>
    </Card>
  );
};

export default CommonCard;
