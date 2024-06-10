import Image from 'next/image'
import Box from '../box/Box'

interface BillboardProps {
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
}

const Billboard: React.FC<BillboardProps> = ({ image }) => {
  return (
    <Box padding={false} centered={true}>
      <Image
        className='max-w-full h-[390px] object-contain'
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        objectFit="contain"
      />
    </Box>
  )
}

export default Billboard