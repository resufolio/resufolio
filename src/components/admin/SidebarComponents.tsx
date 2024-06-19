import React from 'react'
import { Droppable, Draggable } from "@hello-pangea/dnd"
import DraggableButton from './DraggableButton'
import { dndId, ComponentInterface } from '@/lib/admin/utils'

const SidebarComponents: React.FC<{components: ComponentInterface[]}> = ({components}) => {
    return (
        <Droppable
            droppableId={dndId.stringify({ type: 'droppable', name: 'sidebar-components' })}
            isDropDisabled={true}
            type="component"
            isCombineEnabled={false}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="w-[192px]">
                    {components.map((component, index) => (
                        <Draggable
                            key={index}
                            draggableId={dndId.stringify({ type: 'draggable', name: 'sidebar-components', componentType: component.type, index})}
                            index={index}>
                            {(provided) => (
                                <div
                                    className="user-select-none w-full"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <DraggableButton>
                                        {component.type}
                                    </DraggableButton>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default SidebarComponents
