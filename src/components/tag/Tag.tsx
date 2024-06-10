import React from 'react'

export interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <span className="inline-block text-gray-500 border dark:bg-slate-700 dark:text-white border-gray-500 text-xs font-semibold mr-2 px-3 py-2 rounded-lg uppercase">
      {label}
    </span>
  )
}

export default Tag
