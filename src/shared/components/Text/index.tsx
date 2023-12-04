import { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
import { conformText } from '@/shared/utils/';

interface CommonTextProps {
  type: keyof typeof TEXT_TYPE;
  color?: string;
  noOfLines?: number | number[];
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 700 | 600 | 500 | 400;
}

const TEXT_TYPE = {
  strongTitle: { fontSize: '3rem' },
  normalTitle: { fontSize: '1.5rem' },
  smallTitle: { fontSize: '1.25rem' },
  strongInfo: { fontSize: '1rem' },
  subStrongInfo: { fontSize: '1.125rem' },
  normalInfo: { fontSize: '0.875rem' },
  boldNormalInfo: { fontSize: '0.75rem' },
  smallInfo: { fontSize: '0.75rem' },
};

const CommonText = ({
  type,
  color = 'inherit',
  noOfLines = 1,
  as = 'h2',
  children,
  weight,
}: CommonTextProps) => {
  return (
    <>
      {conformText(type, 'title') ? (
        <Text as={as} color={color} noOfLines={noOfLines} {...TEXT_TYPE[type]}>
          {children}
        </Text>
      ) : (
        <Text color={color} noOfLines={noOfLines} {...TEXT_TYPE[type]} fontWeight={weight}>
          {children}
        </Text>
      )}
    </>
  );
};

export default CommonText;
