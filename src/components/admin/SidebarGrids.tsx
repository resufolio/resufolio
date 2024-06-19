import React from 'react'
import { Droppable, Draggable } from "@hello-pangea/dnd"
import DraggableButton from './DraggableButton'
import { dndId, Grid, widthClassMap } from '@/lib/admin/utils'
// import ColumnsInput from './ColumnsInput'

const SidebarGrids: React.FC<{grids: Grid[]}> = ({grids}) => {
    return (
        <Droppable
            droppableId={dndId.stringify({ type: 'droppable', name: 'sidebar-grids' })}
            isDropDisabled={true}
            type="row"
            isCombineEnabled={false}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w-[192px]">
                    {grids.map((grid, index) => (
                        <Draggable
                            draggableId={dndId.stringify({ type: 'draggable', name: 'sidebar-grids', index })}
                            index={index}
                            key={index}>
                            {(provided) => (
                                <div
                                    className="w-48 rounded-lg user-select-none text-sm flex items-center"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <DraggableButton>
                                        {grid.columns.map((width, innerIndex) => (
                                            <span key={innerIndex} className={`${widthClassMap[width]} bg-gray-100 border border-gray-300 rounded-sm indent-1`}>
                                                {width}
                                            </span>
                                        ))}
                                    </DraggableButton>
                                </div>
                            )}
                        </Draggable>)
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default SidebarGrids
