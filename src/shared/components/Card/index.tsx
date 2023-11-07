import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { CommonBadge } from '@/shared/components';

interface CommonCardProps {
  count: number;
  children: ReactElement;
  onClick: () => void;
}

const CommonCard = ({ count, children, onClick }: CommonCardProps) => {
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
    </Card>
  );
};

export default CommonCard;
