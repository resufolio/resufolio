import React from 'react'

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  link?: {
    text: string;
    href: string;
  };
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingProps> = ({ level, text, link, size }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  const headingByLevel = [
    'text-4xl font-bold',
    'text-3xl font-semibold',
    'text-2xl font-medium',
    'text-xl font-medium',
    'text-lg font-medium',
    'text-base font-medium',
  ]
  size = size || level
  return (
    <div className="flex items-center leading-6 dark:text-white">
      <HeadingTag className={'mr-2 '+ headingByLevel[size - 1]}>{text}</HeadingTag>
      {link && (
        <a href={link.href} className="text-primary-500 hover:text-primary-600 transition ml-auto">
          {link.text}
        </a>
      )}
    </div>
  )
}

export default Heading
