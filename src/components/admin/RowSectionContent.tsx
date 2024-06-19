import React from 'react'
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { dndId, widthClassMap, RowSectionContentProps } from '@/lib/admin/utils'
import ActionButtons from '@/components/admin/ActionButtons'
import ComponentRenderer from '@/components/admin/ComponentRenderer'

const RowSectionContent: React.FC<RowSectionContentProps> = ({ id, columns, handleDeleteComponent }) => {
    return (
        <section className="inline-flex w-full">
            {columns.map((column, index) => (
                <Droppable
                    key={index}
                    droppableId={dndId.stringify({ type: 'droppable', name: 'column', rowId: id, columnId: column.id, index })}
                    type="component"
                    isCombineEnabled={false}>
                    {(provided, snapshot) => (
                        <div
                            className={`transition border border-gray-300 relative pt-6 rounded-sm overflow-hidden
                            before:content-['Column'] before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
                            before:font-semibold before:px-2 before:py-1 before:text-gray-500 min-h-[120px]
                            ${snapshot.draggingFromThisWith ? 'bg-orange-100' : 'bg-white'}
                            ${snapshot.isDraggingOver ? 'bg-sky-100' : 'bg-white'}
                            before:rounded-br before:border-b before:border-r before:border-gray-200 ${widthClassMap[column.width]}`}
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {column.components.map((component, innerIndex) => (
                                <Draggable
                                    key={innerIndex}
                                    draggableId={dndId.stringify({ type: 'draggable', name: 'component', rowId: id, columnId: column.id, componentId: innerIndex, componentType: component.type })}
                                    index={innerIndex}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="bg-white border border-gray-100 p-3 mb-5 w-full"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <div className="relative">
                                                <div className="relative">
                                                    <ActionButtons
                                                        handleDelete={handleDeleteComponent}
                                                        snapshot={snapshot}
                                                        id={component.id}
                                                        provided={provided}
                                                        position="inside"
                                                    />
                                                </div>
                                                <ComponentRenderer component={component} />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            <div className={`border m-2 border-gray-200 rounded-lg ${snapshot.isDraggingOver ? 'opacity-100' : 'opacity-0'}`}>{provided.placeholder}</div>
                        </div>
                    )}
                </Droppable>
            ))}
        </section>
    )
}

export default RowSectionContent
