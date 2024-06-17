"use client"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"

const RowSection: React.FC<{id: number}> = ({id}) => {
    return (
        <section className="inline-flex border border-slate-300 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
            <Droppable key={index} droppableId={`droppable-${id}-${index}`}>
                {(provided) => (
                    <div
                        className="border p-3 mb-5 rounded-lg user-select-none w-3/12"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {Array.from({ length: 3 }).map((_, innerIndex) => (
                            <Draggable key={innerIndex} draggableId={`draggable-${id}-${index}-${innerIndex}`} index={innerIndex}>
                                {(provided) => (
                                    <div
                                        className="bg-gray-200 p-3 mb-5 w-48 rounded-lg user-select-none"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        Component {index}-{innerIndex}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        <div className="border border-gray-200 rounded-lg">{provided.placeholder}</div>
                    </div>
                )}
            </Droppable>
        ))}
    </section>
    )
}

const TestsPage = () => {
    const [result, setResult] = useState<DropResult | null>(null)
    const handleDragEnd = (result: DropResult) => {
        const { destination } = result
        if (!destination) return
        setResult(result)
    }

    return (
        <div>
        <div className="bg-white p-3 flex">
            <DragDropContext onDragEnd={handleDragEnd}>
                <aside className="border-b w-full py-2 flex-1">
                    <Droppable droppableId="droppable" isDropDisabled={true}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-[192px]">
                                <Draggable draggableId="draggable-1" index={0}>
                                    {(provided) => (
                                        <div
                                            className="bg-gray-200 p-3 mb-5 w-48 rounded-lg user-select-none"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            Draggable 1
                                        </div>
                                    )}
                                </Draggable>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </aside>
                <div className="w-full flex-grow-0 p-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <RowSection key={index} id={index} />
                    ))}
                </div>
            </DragDropContext>
        </div>
        <div className="bg-slate-800 text-white p-3 mt-5">
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
        </div>
    )
}

export default TestsPage