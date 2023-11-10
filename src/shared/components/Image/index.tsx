import { Image, ImageProps } from '@chakra-ui/react';

interface CommonImageProps {
  size: keyof typeof IMAGE_SIZE;
  src?: ImageProps['src'];
  alt?: ImageProps['alt'];
  onClick?: () => void;
}

const IMAGE_SIZE = {
  xs: { borderRadius: 'full', maxWidth: '3.1875rem', maxHeight: '3.1875rem' },
  sm: { maxWidth: '7rem', maxHeight: '6.4375rem', borderRadius: '0.625rem' },
  base: { borderRadius: '0.625rem', maxWidth: '9.0625rem', maxHeight: '6.5rem' },
  md: { borderRadius: '0.625rem', maxWidth: '22.6875rem', maxHeight: '11.6875rem' },
  lg: { borderRadius: '0.625rem', maxWidth: '21.875rem', maxHeight: '15.6875rem' },
  xl: { borderRadius: '0.625rem', maxWidth: '20.1875rem', maxHeight: '16.5rem' },
};

const CommonImage = ({ size, alt, src, onClick }: CommonImageProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <Image
      src={src}
      alt={alt}
      {...IMAGE_SIZE[size]}
      objectFit="cover"
      width="100%"
      height="auto"
      fallbackSrc="https://placehold.co/800?text=Bucket+Back&font=roboto"
      onClick={handleClick}
      cursor="pointer"
    />
  );
};

export default CommonImage;
