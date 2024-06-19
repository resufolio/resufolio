import React from 'react'

const SidebarTitle: React.FC<{ title: string, icon?: React.ReactNode }> = ({ title, icon }) => {
    return (
        <h3 className='text-white font-semibold mb-3 flex items-center'>
            {icon && <span className="inline-block mr-2">{icon}</span>}
            <span>{title}</span>
        </h3>
    )
}

export default SidebarTitle
