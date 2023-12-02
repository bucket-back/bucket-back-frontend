import { Image, ImageProps } from '@chakra-ui/react';

interface CommonImageProps {
  size: keyof typeof IMAGE_SIZE;
  src?: ImageProps['src'];
  alt?: ImageProps['alt'];
  onClick?: () => void;
}

const IMAGE_SIZE = {
  xs: { width: '3.1875rem', aspectRatio: '1/1' },
  sm: { width: '7rem', aspectRatio: '112/103' },
  base: { width: '9.0625rem', aspectRatio: '145/104' },
  md: { width: '22.6875rem', aspectRatio: '363/187' },
  lg: { width: '21.875rem', aspectRatio: '350/251' },
  xl: { width: '20.1875rem', aspectRatio: '323/264' },
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
      maxW="100%"
      objectFit="cover"
      cursor="pointer"
      borderRadius={size === 'xs' ? 'full' : '0.625rem'}
      fallbackSrc="https://placehold.co/800?text=Bucket+Back&font=roboto"
      onClick={handleClick}
      border="1px solid #e2e8f0"
    />
  );
};

export default CommonImage;
