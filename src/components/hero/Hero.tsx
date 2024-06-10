import React from 'react'
import Markdown from '../markdown/Markdown'
import Image from 'next/image'
import { iconMap } from '../textToIcon/TextToIcon'
import TextToIcon from '../textToIcon/TextToIcon'

export interface HeroProps {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  markdownText: string;
  callToAction?: {
    text: string;
    link: string;
    icon?: keyof typeof iconMap;
  }
}

/**
 * Hero component displays an image and markdown text in a flexible layout.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.image - The image object containing the source and alt text.
 * @param {string} props.image.src - The source URL of the image.
 * @param {string} props.image.alt - The alt text of the image.
 * @param {string} props.markdownText - The markdown text to be rendered.
 * @returns {JSX.Element} The rendered Hero component.
 */
const Hero: React.FC<HeroProps> = ({ image, markdownText, callToAction }) => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full bg-white dark:bg-slate-900">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <div className="relative h-80 rounded-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className='object-contain'
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 md:pl-6">
        <Markdown className="prose dark:prose-invert">{markdownText}</Markdown>
        {callToAction && (
          <>
            <a
              href={callToAction.link}
              target='_blank'
              className="mt-6 inline-flex items-center px-6 py-2 gap-x-2 font-semibold text-white bg-primary-500 rounded-full hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75"
            >
              {callToAction.icon && <TextToIcon icon={callToAction.icon} />}
              {callToAction.text}
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default Hero
