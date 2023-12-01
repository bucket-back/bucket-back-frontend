import { Grid, GridItem, Image } from '@chakra-ui/react';

interface DividerImageProps {
  images: string[];
  type: 'base' | 'live';
}

const BORDER_TYPE = '1px solid #E2E8F0';
const GRID_REPEAT = 'repeat(2, 1fr)';

const isFirstAndThird = (index: number) => index === 1 || index === 3;
const isFirstAndSecond = (index: number) => index === 0 || index === 1;
const isLastImage = (index: number, count: number) => count - 1 === index;
const isSecondAndThird = (count: number) => count === 2 || count === 3;

const DividerImage = ({ images, type }: DividerImageProps) => {
  const count = images.length;

  const dividerImage = {
    live: (
      <Grid
        templateColumns={GRID_REPEAT}
        borderRadius="50%"
        width="5.625rem"
        aspectRatio="1/1"
        overflow="hidden"
        borderWidth="3px"
        borderColor="blue.300"
      >
        {images.map((image, index) => {
          return (
            <GridItem
              key={index}
              borderLeft={isLastImage(index, count) ? BORDER_TYPE : undefined}
              width="100%"
              height="100%"
            >
              <Image src={image} width="100%" height="100%" objectFit="cover" />
            </GridItem>
          );
        })}
      </Grid>
    ),
    base: (
      <Grid
        templateColumns={count >= 2 ? GRID_REPEAT : '1fr'}
        templateRows={count >= 3 ? GRID_REPEAT : undefined}
        width="100%"
        aspectRatio="70/64"
        borderRadius="0.625rem"
        background="linear-gradient(90deg, #DCE1E8 0%, #EDF2F7 100%);"
        overflow="hidden"
        borderWidth="1px"
        borderColor="gray.200"
      >
        {images.map((image, index) => {
          return (
            <GridItem
              key={index}
              width="100%"
              height="100%"
              rowSpan={count === 3 && index === 0 ? 2 : undefined}
              borderLeft={count === 4 && isFirstAndThird(index) ? BORDER_TYPE : undefined}
              borderRight={isSecondAndThird(count) && index === 0 ? BORDER_TYPE : undefined}
              borderBottom={
                count > 2 && index === 1
                  ? BORDER_TYPE
                  : count === 4 && isFirstAndSecond(index)
                  ? BORDER_TYPE
                  : undefined
              }
            >
              <Image
                src={image}
                width="100%"
                height="100%"
                objectFit="cover"
                fallbackSrc="https://placehold.co/300?text=Bucket+Back&font=roboto"
              />
            </GridItem>
          );
        })}
      </Grid>
    ),
  };

  return <>{dividerImage[type]}</>;
};

export default DividerImage;
