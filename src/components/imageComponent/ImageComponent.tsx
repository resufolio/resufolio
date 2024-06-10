import Image from 'next/image'

interface ImageComponentProps {
  src: string;
  alt: string;
  width: number;
  height: number;    
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt, width, height }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}

export default ImageComponent