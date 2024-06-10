import React from 'react'
import Image from 'next/image'
import Tag from '../tag/Tag'

export interface CardProps {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  text: string;
  tags: string[];
  link?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ image, title, subtitle, icon, text, tags, link, className }) => {
  const target = (href: string) => href.startsWith('/') ? '_self' : '_blank'
  return (
    <div className={`flex flex-col rounded-xl border-gray-200 dark:border-slate-600 dark:bg-slate-900 border overflow-hidden shadow-md grow ${className}`}>
      <div className="relative h-48">
        {link ? (
          <a href={link} className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 cursor-pointer" target={target(link)}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className='object-contain hover:scale-105 hover:opacity-90 transition'
            />
          </a>
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            layout='fill'
            objectFit='cover'
          />
        )}
      </div>
      <div className="flex flex-col px-6 pt-6 pb-8 border-t border-gray-200 dark:border-slate-600 grow dark:bg-slate-800">
        <div className="flex items-center my-2">
          {icon && <div className="mr-2">{icon}</div>}
          <h2 className="font-bold text-xl dark:text-white">
            {link ? (
              <a href={link} className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75" target={target(link)}>
                {title}
              </a>
            ) : (
              title
            )}
          </h2>
          {subtitle && <p className="text-gray-600 text-base ml-2 block">{subtitle}</p>}
        </div>
        <p className="text-gray-600 dark:text-slate-300 text-base my-4">{text}</p>
        <div className="flex flex-wrap gap-y-2 mt-auto">
          {tags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
