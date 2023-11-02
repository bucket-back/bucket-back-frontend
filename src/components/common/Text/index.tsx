import { Heading, Text } from '@chakra-ui/react';
import conformText from '../../../utils/conformText';

interface CommonTextProps {
  type: keyof typeof TEXT_TYPE;
  color: string;
  noOfLines: number | number[];
  children: string;
}

const TEXT_TYPE = {
  strongTitle: { fontSize: '3rem', weight: 700 },
  normalTitle: { fontSize: '1.5rem', weight: 700 },
  smallTitle: { fontSize: '1.25rem', weight: 700 },
  strongInfo: { fontSize: '1rem', weight: 700 },
  subStrongInfo: { fontSize: '1.125rem', weight: 400 },
  normalInfo: { fontSize: '0.875rem', weight: 500 },
  boldNormalInfo: { fontSize: '0.75rem', weight: 600 },
  smallInfo: { fontSize: '0.75rem', weight: 400 },
};

const CommonText = ({ type, color, noOfLines, children }: CommonTextProps) => {
  return (
    <>
      {conformText(type, 'title') ? (
        <Heading color={color} noOfLines={noOfLines} fontFamily="Inter" {...TEXT_TYPE[type]}>
          {children}
        </Heading>
      ) : (
        <Text color={color} noOfLines={noOfLines} {...TEXT_TYPE[type]}>
          {children}
        </Text>
      )}
    </>
  );
};

export default CommonText;
