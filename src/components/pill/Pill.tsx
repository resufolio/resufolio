import React from 'react'

export type Level = 1 | 2 | 3 | 4 | 5

export interface PillProps {
  label: string;
  icon?: React.ReactNode;
  level?: Level;
}

const Pill: React.FC<PillProps> = ({ label, icon, level }) => {
  return (
    <div className="inline-flex w-full items-center border border-gray-400 text-sm font-semibold mr-2 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 bg-white dark:bg-slate-700">
      {icon && <span className="mr-2">{icon}</span>}
      <span className='text-gray-600 dark:text-white'>{label}</span>
      {level &&
        <span className='ml-auto'>
        {
          Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={"ml-2 rounded-full h-2 w-2 inline-block " + (index < level ? 'bg-primary-500' : 'bg-gray-200')}></span>
          ))
        }
        </span>
      }
    </div>
  )
}

export default Pill
