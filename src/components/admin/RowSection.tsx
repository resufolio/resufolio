import React from 'react'
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { dndId, RowSectionProps } from '@/lib/admin/utils'
import ActionButtons from './ActionButtons'
import RowSectionContent from './RowSectionContent'

const RowSection: React.FC<RowSectionProps> = ({ id, columns, index, handleDeleteRow, handleDeleteComponent }) => {
    return (
        <Droppable
            droppableId={dndId.stringify({ type: 'droppable', name: 'row', rowId: id })}
            isCombineEnabled={false}>
            {(provided) => (
                <div
                    className="w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <Draggable
                        draggableId={dndId.stringify({ type: 'draggable', name: 'row', rowId: id })}
                        index={index}>
                        {(provided, snapshot) => (
                            <section
                                className={`relative p-2 overflow-hidden mb-1 rounded border pt-12 bg-gray-100 border-gray-300 shadow-inner
                                before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
                                before:content-["Row"] before:font-semibold before:px-2 before:py-1 before:text-gray-500
                                before:rounded-br before:border-b before:border-r before:border-gray-300`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <ActionButtons
                                    handleDelete={handleDeleteRow}
                                    id={id}
                                    position="outside"
                                    provided={provided}
                                    snapshot={snapshot}
                                />
                                <RowSectionContent handleDeleteComponent={handleDeleteComponent} id={id} columns={columns} />
                            </section>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default RowSection
