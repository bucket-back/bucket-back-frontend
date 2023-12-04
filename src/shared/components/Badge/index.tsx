import { Badge, Flex } from '@chakra-ui/react';
import { CommonIcon } from '@/shared/components';

const LEVEL_COLOR = {
  FONT: {
    1: 'gray.800',
    2: 'pink.800',
    3: 'blue.800',
    4: 'teal.800',
    5: 'green.800',
    6: 'yellow.800',
    7: 'purple.800',
    8: 'blue.800',
    9: 'red.900',
    10: 'red.600',
  },
  BACKGROUND: {
    1: 'gray.200',
    2: 'pink.100',
    3: 'blue.100',
    4: 'teal.100',
    5: 'green.100',
    6: 'orange.100',
    7: 'purple.300',
    8: 'cyan.400',
    9: 'red.400',
    10: 'yellow.300',
  },
};

interface CommonBadgeProps {
  type: 'level' | 'adopt' | 'vote';
  levelNumber?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  count?: number;
  isVoting?: boolean;
}

const CommonBadge = ({ type, levelNumber, count, isVoting }: CommonBadgeProps) => {
  const badge = {
    level: levelNumber && (
      <Badge
        width="fit-content"
        color={LEVEL_COLOR.FONT[levelNumber]}
        bgColor={LEVEL_COLOR.BACKGROUND[levelNumber]}
      >
        {`LV. ${levelNumber}`}
      </Badge>
    ),
    adopt: (
      <Badge width="fit-content" color="purple.800" bgColor="purple.100">
        <Flex alignItems="center" gap="0.25rem">
          채택
          <CommonIcon type="crown" />
        </Flex>
      </Badge>
    ),
    vote: (
      <Badge width="fit-content" color="blue.900" bgColor="blue.100">
        {count}명 참여{isVoting ? '중' : '완료'}
      </Badge>
    ),
  };

  return <>{badge[type]}</>;
};

export default CommonBadge;
