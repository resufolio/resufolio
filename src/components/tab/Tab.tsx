import React from 'react'

export interface TabProps {
  title: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const Tab: React.FC<TabProps> = ({ title, icon, isActive, onClick }) => {
  return (
    <button
      className={`flex items-center px-4 py-2 border-b-2 ${
        isActive ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{title}</span>
    </button>
  )
}

export default Tab
