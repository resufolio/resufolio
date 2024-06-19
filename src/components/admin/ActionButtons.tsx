import React from 'react'
import { FaArrowsAlt, FaTrash } from "react-icons/fa"
import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd"

interface ActionsButtonsProps {
    handleDelete: (id: string) => void;
    id: string;
    provided: DraggableProvided;
    position: 'inside' | 'outside';
    snapshot?: DraggableStateSnapshot;
}

const ActionButtons: React.FC<ActionsButtonsProps> = ({handleDelete, id, provided, position = 'inside', snapshot}) => {
    return (
        <div className={`ml-auto absolute ${position === 'inside' ? '-top-2 -right-2' : 'top-2 right-2'} text-xs`}>
            <div
                className={`p-1 bg-sky-400 inline-flex items-center transition rounded text-white hover:bg-blue-500 hover:opacity-100 active:bg-blue-500 active:opacity-100 ${snapshot?.isDragging ? 'opacity-100' : 'opacity-30'} cursor-grab mr-2`}
                {...provided.dragHandleProps}
            >
                <FaArrowsAlt />
                <span className='ml-1'>Drag</span>
            </div>
            <button
                onClick={() => handleDelete(id)}
                className="bg-red-400 inline-flex items-center hover:bg-red-500 opacity-30 hover:opacity-100 text-white rounded p-1 cursor-pointer">
                <FaTrash/>
                <span className='ml-1'>Delete</span>
            </button>
        </div>
    )
}

export default ActionButtons
