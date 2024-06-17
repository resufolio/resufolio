"use client"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"

/**
* Mapping of numbers to tailwind classes representing width values.
*/
const widthClassMap: Record<number, string> = {
    1: 'w-full md:w-1/12',
    2: 'w-full md:w-2/12',
    3: 'w-full md:w-3/12',
    4: 'w-full md:w-4/12',
    5: 'w-full md:w-5/12',
    6: 'w-full md:w-6/12',
    7: 'w-full md:w-7/12',
    8: 'w-full md:w-8/12',
    9: 'w-full md:w-9/12',
    10: 'w-full md:w-10/12',
    11: 'w-full md:w-11/12',
    12: 'w-full',
}

interface Component {
    id: string;
    type: string;
    props: Record<string, any>;
}

interface Column {
    id: string;
    components: Component[];
    width: number;
}

interface Row {
    id: string;
    columns: Column[];
}

// interface Grid {
//     columns: number[];
// }


interface RowSectionProps extends Row {
    index: number;
}

const RowSection: React.FC<RowSectionProps> = ({ id, columns, index }) => {
    return (
        <Droppable droppableId={`droppable-row-${id}`}>
            {(provided) => (
                <div
                    className="border border-slate-300 w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <Draggable draggableId={`draggable-row-${id}`} index={index}>
                        {(provided) => (
                            <section
                                className="border border-slate-300 w-full"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <RowSectionContent id={id} columns={columns} />
                            </section>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

const RowSectionContent: React.FC<Row> = ({ id, columns }) => {
    return (
        <section className="inline-flex border border-slate-300 w-full">
        {columns.map((column, index) => (
            <Droppable key={index} droppableId={`droppable-${id}-${index}`} type="component">
                {(provided) => (
                    <div
                        className={`border p-3 mb-5 rounded-lg user-select-none ${widthClassMap[column.width]}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {column.components.map((component, innerIndex) => (
                            <Draggable key={innerIndex} draggableId={`draggable-${id}-${index}-${innerIndex}`} index={innerIndex}>
                                {(provided) => (
                                    <div
                                        className="bg-gray-200 p-3 mb-5 w-48 rounded-lg user-select-none"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        {component.type} {index}-{innerIndex}
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
    const [rows, setRows] = useState<Row[]>([
        {
            id: "row-1",
            columns: [
                {
                    id: "column-1",
                    width: 4,
                    components: [
                        { id: "component-1", type: "text", props: {} },
                        { id: "component-2", type: "image", props: {} },
                    ],
                },
                {
                    id: "column-2",
                    width: 8,
                    components: [
                        { id: "component-3", type: "text", props: {} },
                        { id: "component-4", type: "image", props: {} },
                        { id: "component-9", type: "text", props: {} }
                    ],
                },
            ],
        },
        {
            id: "row-2",
            columns: [
                {
                    id: "column-3",
                    width: 4,
                    components: [
                        { id: "component-5", type: "text", props: {} },
                        { id: "component-6", type: "image", props: {} },
                    ],
                },
                {
                    id: "column-4",
                    width: 4,
                    components: [
                        { id: "component-7", type: "text", props: {} },
                        { id: "component-8", type: "image", props: {} },
                    ],
                },
                {
                    id: "column-5",
                    width: 4,
                    components: [
                        { id: "component-10", type: "text", props: {} }
                    ],
                }
            ],
        },
    ])

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
                    <Droppable droppableId="droppable" isDropDisabled={true} type="component">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-[192px]">
                                <Draggable draggableId="draggable-1" index={0}>
                                    {(provided) => (
                                        <div
                                            className="bg-gray-200 p-3 mb-5 w-48 rounded-lg user-select-none"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            Component 1
                                        </div>
                                    )}
                                </Draggable>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </aside>
                <div className="w-full flex-grow-0 p-4">
                    {rows.map((row, index) => (
                        <RowSection key={row.id} index={index} {...row} />
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