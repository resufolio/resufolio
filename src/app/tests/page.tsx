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

interface DnDId <T extends string> {
    type: 'droppable' | 'draggable';
    name: T;
    index?: number;
    rowId?: string;
    columnId?: string;
}
type DnDIdType = 'container' | 'sidebar-grids' | 'sidebar-components' | 'row' | 'column' | 'component'

const dndId = {
    parse: (id: string) => JSON.parse(id) as DnDId<DnDIdType>,
    stringify: (id: DnDId<DnDIdType>) => JSON.stringify(id),
}

const SidebarGrids: React.FC<{grids: Grid[]}> = ({grids}) => {
    return (
        <>
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
        <Droppable
            droppableId={dndId.stringify({ type: 'droppable', name: 'row', rowId: id })}
            isCombineEnabled={false}>
            {(provided) => (
                <div
                    className="border border-slate-300 w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <p>{`droppable-row-${id}`}</p>
                    <Draggable
                        draggableId={dndId.stringify({ type: 'draggable', name: 'row', rowId: id })}
                        index={index}>
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
            <Droppable
                key={index}
                droppableId={dndId.stringify({ type: 'droppable', name: 'column', rowId: id, columnId: column.id })}
                type="component"
                isCombineEnabled={false}>
                {(provided) => (
                    <div
                        className={`border p-3 mb-5 rounded-lg user-select-none ${widthClassMap[column.width]}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {column.components.map((component, innerIndex) => (
                            <Draggable
                                key={innerIndex}
                                draggableId={dndId.stringify({ type: 'draggable', name: 'component', rowId: id, columnId: column.id })}
                                index={innerIndex}>
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
            id: `${innerIndex}`,
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
        const sourceDroppableId = dndId.parse(source.droppableId)
        const destinationDroppableId = dndId.parse(destination.droppableId)

        if(sourceDroppableId.name === 'sidebar-grids' && destinationDroppableId.name === 'container') {
            const grid: Grid = grids[source.index]
            const row: Row = gridToRow(grid, rows.length)
            setRows([...rows, row])
        }
        // Reordering rows inside the container
        else if(sourceDroppableId.name === 'row' && destinationDroppableId.name === 'row') {
            const newRows = [...rows]
            const [removed] = newRows.splice(source.index, 1)
            newRows.splice(destination.index, 0, removed)
            setRows(newRows)
        }
        // Adding a new component to a column
        else if(sourceDroppableId.name === 'sidebar-components' && destinationDroppableId.name === 'column') {
            alert("Adding component to column")
        }
        console.log({ sourceDroppableId, destinationDroppableId })
    }

    return (
        <>
        <title>Page Wizard: Page Editor</title>
        <div className="bg-white flex min-h-screen">
            <DragDropContext onDragEnd={handleDragEnd}>
                <aside className="border-b w-full py-2 flex-1 bg-slate-900">
                    <SidebarGrids grids={grids} />
                    <Droppable
                        droppableId={dndId.stringify({ type: 'droppable', name: 'sidebar-components' })}
                        isDropDisabled={true}
                        type="component"
                        isCombineEnabled={false}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="w-[192px]">
                                <Draggable
                                    draggableId={dndId.stringify({ type: 'draggable', name: 'sidebar-components' })}
                                    index={0}>
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
                    <div>
                        {JSON.stringify(rows)}
                    </div>
                    <Droppable
                        droppableId={dndId.stringify({ type: 'droppable', name: 'container' })}
                        type="row"
                        isCombineEnabled={false}>
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
    </>
    )
}

export default TestsPage