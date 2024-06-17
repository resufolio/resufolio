"use client"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"
import { FaGripVertical } from "react-icons/fa"

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

interface Grid {
    columns: number[];
}

interface RowSectionProps extends Row {
    index: number;
}

const SidebarGrids: React.FC<{grids: Grid[]}> = ({grids}) => {
    return (
        <>
            <Droppable droppableId={`sidebar-grids-droppable`} isDropDisabled={true} type="row" isCombineEnabled={false}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="w-[192px]">
                        {grids.map((grid, index) => (
                        <Draggable draggableId={`sidebar-grids-draggable-${index}`} index={index} key={index}>
                            {(provided) => (
                                <div
                                    className="bg-gray-200 p-3 mb-5 w-48 rounded-lg user-select-none text-sm flex items-center"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <div className="inline-flex w-full items-center">
                                        <FaGripVertical className="mr-2" />
                                        {grid.columns.map((width, innerIndex) => (
                                            <span key={innerIndex} className={`${widthClassMap[width]} bg-gray-100 border border-gray-300 rounded-sm indent-1`}>
                                                {width}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Draggable>)
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    )
}

const RowSection: React.FC<RowSectionProps> = ({ id, columns, index }) => {
    return (
        <Droppable droppableId={`droppable-row-${id}`} isCombineEnabled={false}>
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
            <Droppable key={index} droppableId={`droppable-${id}-${index}`} type="component" isCombineEnabled={false}>
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

const gridToRow = (grid: Grid, index: number): Row => {
    return {
        id: `${index}`,
        columns: grid.columns.map((width, innerIndex) => ({
            id: `column-${innerIndex}`,
            components: [],
            width,
        }))
    }
}

const TestsPage = () => {
    const [rows, setRows] = useState<Row[]>([])
    const grids: Grid[] = [
        { columns: [6, 6] },
        { columns: [4, 4, 4] },
        { columns: [8, 4] },
        { columns: [12] }
    ]
    const handleDragEnd = (result: DropResult) => {
        const { destination, source } = result
        if (!destination) return
        if(source.droppableId === destination.droppableId) return
        // Adding a new row to the container
        if(source.droppableId === 'sidebar-grids-droppable' && destination.droppableId === 'container') {
            const grid: Grid = grids[source.index]
            const row: Row = gridToRow(grid, rows.length)
            setRows([...rows, row])
        }
        // Reordering rows inside the container
        else if(source.droppableId.startsWith('droppable-row-') && destination.droppableId.startsWith('droppable-row-')) {
            const newRows = [...rows]
            const [removed] = newRows.splice(source.index, 1)
            newRows.splice(destination.index, 0, removed)
            setRows(newRows)
        }
        console.log({ destination, source })
    }

    return (
        <div className="bg-white flex min-h-screen">
            <DragDropContext onDragEnd={handleDragEnd}>
                <aside className="border-b w-full py-2 flex-1 bg-slate-900">
                    <SidebarGrids grids={grids} />
                    <Droppable droppableId="sidebar-components-droppable" isDropDisabled={true} type="component" isCombineEnabled={false}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-[192px]">
                                <Draggable draggableId="sidebar-components-draggable" index={0}>
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
                <div className="w-full flex-grow-0 p-4 min-h-screen">
                    <Droppable droppableId="container" type="row" isCombineEnabled={false}>
                        {(provided) => (
                            <div
                                className="border border-slate-300 w-full min-h-screen"
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                    {rows.map((row, index) => (
                                        <RowSection key={row.id} index={index} {...row} />
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </div>
            </DragDropContext>
        </div>
    )
}

export default TestsPage