import React from 'react'
import Markdown from '@/components/markdown/Markdown'

interface FlatListProps {
  title: string
  items: string[]
  ordered?: boolean
}

const FlatList: React.FC<FlatListProps> = ({ title, items, ordered = false }) => {
  const ListTag = ordered ? 'ol' : 'ul'
  return (
    <div className="border-l-4 border-gray-800 dark:border-slate-200 pl-4">
      <h3 className="mb-2 text-lg font-bold prose dark:prose-invert">
        <Markdown>{title}</Markdown>
      </h3>
      <ListTag className={ordered ? 'list-decimal pl-5' : 'list-disc pl-5'}>
        {items.map((item, index) => (
          <li key={index} className="mb-2 prose dark:prose-invert">
            <Markdown>{item}</Markdown>
          </li>
        ))}
      </ListTag>
    </div>
  )
}

export default FlatList
