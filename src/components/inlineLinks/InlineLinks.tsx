import TextToIcon from "@/components/textToIcon/TextToIcon"

interface InlineLinksProps {
  title: string;
  links: {
    href: string;
    source?: 'GitHub' | 'NPM' | 'DevTo' | 'Link'
    text: string;
  }[]
}

export default function InlineLinks({ title, links }: InlineLinksProps) {

  return (
    <div className="inline-flex">
      <span className="mr-4 font-semibold dark:text-white">{title}:</span>
      <ul className="mb-4">
        {links.map((link, index) => (
          <li key={index} className="inline-flex items-center gap-x-2 mr-2">
            <a href={link.href} className="text-primary-400 hover:text-primary-600 transition font-semibold inline-flex items-center ml-2" target="_blank">
              <TextToIcon icon={link.source ?? 'Link' } className="text-gray-400 dark:text-slate-500" />
              <span className="ml-2">{link.text ? link.text : link.source}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}