import React from 'react'

/**
 * DraggableButton component.
 *
 * @param children - The content to be rendered inside the button.
 */
const DraggableButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="p-2 mb-2 bg-white rounded border inline-flex w-full items-center">
            <span className="mr-2 w-full flex">{children}</span>
            <span className={`transition bg-blue-400 hover:bg-blue-500 ml-auto text-white p-1 font-semibold text-xs rounded-sm`}>drag</span>
        </div>
    )
}

export default DraggableButton
