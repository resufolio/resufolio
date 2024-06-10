import Image from 'next/image'
import Markdown from '@/components/markdown/Markdown'

interface LinkCloudsProps {
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  text?: string;
  linkColumns: {
    title: string;
    links: {
      title: string;
      url: string;
    }[];
  }[];
}

const LinkClouds: React.FC<LinkCloudsProps> = ({ logo, text, linkColumns }) => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div>
          { logo && <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} /> }
          { text && <Markdown className="prose dark:prose-invert mt-4">{text}</Markdown> }
        </div>
        <div className='flex grow w-full gap-x-4 md:ml-12 mt-6 md:mt-0'>
            {linkColumns.map((links, index) => (
                <div key={index}>
                    <h3 className='font-bold dark:text-white mb-4'>{links.title}</h3>
                    <ul>
                        {links.links.map((link, innerIdex) => (
                            <li key={innerIdex} className='mb-2'>
                                <a href={link.url} target='_blank' className='dark:text-white dark:border-white border-b text-primary-500 hover:text-primary-600 border-primary-500 hover:border-primary-600 pb-1 transition'>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
  )
}

export default LinkClouds