import { Image } from '@chakra-ui/react';

interface CommonImageProps {
  size: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  src: string;
  alt?: string;
  onClick?: () => void;
}

const imageSize = {
  xs: { borderRadius: 'full', width: '3.1875rem', height: '3.1875rem' },
  sm: { width: '7rem', height: '6.4375rem', borderRadius: '0.625rem' },
  base: { borderRadius: '0.625rem', width: '9.0625rem', height: '6.5rem' },
  md: { borderRadius: '0.625rem', width: '22.6875rem', height: '11.6875rem' },
  lg: { borderRadius: '0.625rem', width: '21.875rem', height: '15.6875rem' },
  xl: { borderRadius: '0.625rem', width: '20.1875rem', height: '16.5rem' },
};

const CommonImage = ({ size, alt, src, onClick }: CommonImageProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <Image
      src={src}
      alt={alt}
      {...imageSize[size]}
      objectFit="cover"
      fallbackSrc="https://placehold.co/800?text=Bucket+Back&font=roboto"
      onClick={handleClick}
      cursor="pointer"
    />
  );
};

export default CommonImage;
