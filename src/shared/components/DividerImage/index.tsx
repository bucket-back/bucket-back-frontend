import { useCallback, useMemo } from 'react';
import { Grid, GridItem, Image } from '@chakra-ui/react';

interface CommonDividerImageProps {
  item: string[];
  count: number;
  type: 'base' | 'live';
}

const BORDERTYPE = 'solid black';
const ISFIRSTANDTHIRD = (index: number) => index === 1 || index === 3;
const ISFIRSTANDSECOND = (index: number) => index === 0 || index === 1;

const CommonDividerImage = ({ item, count, type }: CommonDividerImageProps) => {
  const isLastImage = useCallback((index: number) => count - 1 === index, [count]);
  const isSecondAndThird = useMemo(() => count === 2 || count === 3, [count]);

  const dividerImage = {
    live: (
      <Grid
        templateColumns="repeat(2,1fr)"
        borderRadius="50%"
        width="5.625rem"
        height="5.625rem"
        overflow="hidden"
        borderWidth="3px"
        borderColor="blue.300"
      >
        {item.map((image, index) => {
          return (
            <GridItem
              key={index}
              borderWidth="1px"
              borderLeft={isLastImage(index) ? BORDERTYPE : undefined}
              width="100%"
              height="100%"
            >
              <Image src={image} width="100%" height="100%" />
            </GridItem>
          );
        })}
      </Grid>
    ),
    base: (
      <Grid
        templateColumns={count >= 2 ? 'repeat(2,1fr)' : '1fr'}
        templateRows={count >= 3 ? 'repeat(2,1fr)' : undefined}
        width="7rem"
        height="6.4375rem"
        borderRadius="0.625rem"
        background="linear-gradient(90deg, #DCE1E8 0%, #EDF2F7 100%);"
        overflow="hidden"
      >
        {item.map((image, index) => {
          return (
            <GridItem
              key={index}
              width="100%"
              height="100%"
              rowSpan={count === 3 && index === 0 ? 2 : undefined}
              borderWidth="1px"
              borderLeft={count === 4 && ISFIRSTANDTHIRD(index) ? BORDERTYPE : undefined}
              borderRight={isSecondAndThird && index === 0 ? BORDERTYPE : undefined}
              borderBottom={
                count > 2 && index === 1
                  ? BORDERTYPE
                  : count === 4 && ISFIRSTANDSECOND(index)
                  ? BORDERTYPE
                  : undefined
              }
            >
              <Image src={image} width="100%" height="100%" />
            </GridItem>
          );
        })}
      </Grid>
    ),
  };

  return <>{dividerImage[type]}</>;
};

export default CommonDividerImage;
