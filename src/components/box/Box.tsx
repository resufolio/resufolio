import React from 'react'

export interface BoxProps {
  centered?: boolean;
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

const Box: React.FC<BoxProps> = ({ centered, children, className = '', padding = true }) => {
  return (
    <div
      className={`${className} border bg-white border-gray-300 dark:border-slate-600 dark:bg-slate-800 ${padding ? 'p-4' : ''} rounded-xl ${centered ? 'flex justify-center items-center flex-col gap-3' : ''}`}
    >
      {children}
    </div>
  )
}

export default Box
