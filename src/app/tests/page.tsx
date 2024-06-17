"use client"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"
import { FaGripVertical } from "react-icons/fa"
import { PiLego } from "react-icons/pi"
import { RiGridLine } from "react-icons/ri"

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
    componentId?: number;
}

type DnDIdType = 'container' | 'sidebar-grids' | 'sidebar-components' | 'row' | 'column' | 'component'

const dndId = {
    parse: (id: string) => JSON.parse(id) as DnDId<DnDIdType>,
    stringify: (id: DnDId<DnDIdType>) => JSON.stringify(id),
}
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

/**
* SidebarTitle component displays a title with an optional icon.
*
* @param title - The title to be displayed.
* @param icon - An optional icon to be displayed before the title.
*/
const SidebarTitle: React.FC<{ title: string, icon?: React.ReactNode }> = ({ title, icon }) => {
    return (
        <h3 className='text-white font-semibold mb-3 flex items-center'>
        {icon && <span className="inline-block mr-2">{icon}</span>}
        <span>{title}</span>
        </h3>
    )
}

const SidebarComponents: React.FC = () => {
    return (
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
                                className="user-select-none w-full"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <DraggableButton>
                                    component
                                </DraggableButton>
                            </div>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
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
                    className="w-full"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <Draggable
                        draggableId={dndId.stringify({ type: 'draggable', name: 'row', rowId: id })}
                        index={index}>
                        {(provided) => (
                            <section
                                className={`relative p-2 overflow-hidden mb-1 rounded border pt-12 bg-gray-100 border-gray-300 shadow-inner
                                before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
                                before:content-["Row"] before:font-semibold before:px-2 before:py-1 before:text-gray-500
                                before:rounded-br before:border-b before:border-r before:border-gray-300`}
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
                droppableId={dndId.stringify({ type: 'droppable', name: 'column', rowId: id, columnId: column.id, index })}
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
                                draggableId={dndId.stringify({ type: 'draggable', name: 'component', rowId: id, columnId: column.id, componentId: innerIndex })}
                                index={innerIndex}>
                                {(provided) => (
                                    <div
                                        className="bg-gray-200 p-3 mb-5 w-full rounded-lg user-select-none"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        {JSON.stringify(component)}
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

const EditorPage: React.FC = () => {
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
        if(source.droppableId === destination.droppableId && source.index === destination.index) return
        const sourceDroppableId = dndId.parse(source.droppableId)
        const destinationDroppableId = dndId.parse(destination.droppableId)
        // Adicionar uma nova linha a partir da sidebar
        if (sourceDroppableId.name === 'sidebar-grids' && destinationDroppableId.name === 'container') {
            const grid: Grid = grids[source.index]
            const row: Row = gridToRow(grid, rows.length)
            setRows([...rows, row])
        }
        // Reordenar linhas dentro do container
        else if (sourceDroppableId.name === 'row' && destinationDroppableId.name === 'row') {
            const newRows = [...rows]
            const [removed] = newRows.splice(source.index, 1)
            newRows.splice(destination.index, 0, removed)
            setRows(newRows)
        }
        // Adicionar um novo componente a uma coluna
        else if (sourceDroppableId.name === 'sidebar-components' && destinationDroppableId.name === 'column') {
            const columnId = destinationDroppableId.columnId
            const rowId = destinationDroppableId.rowId
            const newRows = [...rows]
            const row = newRows.find(row => row.id === rowId)
            if (!row) return
            const column = row.columns.find(column => column.id === columnId)
            if (!column) return
            column.components.push({ id: String(column.components.length + 1), type: 'Component', props: {} })
            setRows(newRows)
        }
        // Reordenar componentes dentro de uma coluna
        else if (sourceDroppableId.name === 'column' && destinationDroppableId.name === 'column') {
            const sourceRowId = sourceDroppableId.rowId
            const destinationRowId = destinationDroppableId.rowId
            const sourceColumnId = sourceDroppableId.columnId
            const destinationColumnId = destinationDroppableId.columnId
            const newRows = [...rows]
            const sourceRow = newRows.find(row => row.id === sourceRowId)
            const destinationRow = newRows.find(row => row.id === destinationRowId)
            if (!sourceRow || !destinationRow) return
            const sourceColumn = sourceRow.columns.find(column => column.id === sourceColumnId)
            const destinationColumn = destinationRow.columns.find(column => column.id === destinationColumnId)
            if (!sourceColumn || !destinationColumn) return
            const [removed] = sourceColumn.components.splice(source.index, 1)
            destinationColumn.components.splice(destination.index, 0, removed)
            setRows(newRows)
        }
        console.log({ sourceDroppableId, destinationDroppableId, rows })
        console.log({ source, destination })
    }

    return (
        <>
        <title>Page Wizard: Page Editor</title>
        <div className="bg-slate-900 flex min-h-screen text-sm">
            <DragDropContext onDragEnd={handleDragEnd}>
                <aside className="border-b w-[210px] py-2 bg-slate-900">
                    <div className="px-2">
                        <SidebarTitle title='Grid system' icon={<RiGridLine/>} />
                        <SidebarGrids grids={grids} />
                    </div>
                    <div className="px-2 mt-4">
                        <SidebarTitle title='Components' icon={<PiLego />} />
                        <SidebarComponents />
                    </div>
                </aside>
                <div
                    className={`flex-1 px-3 pt-10 bg-white min-h-full border rounded-sm border-gray-300 m-2 relative
                    before:content-['Container'] before:absolute before:left-0 before:top-0 before:bg-gray-100 before:text-xs
                    before:font-semibold before:px-2 before:py-1 before:text-gray-500
                    before:rounded-br before:border-r before:border-b before:border-gray-300
                    `}>
                    <Droppable
                        droppableId={dndId.stringify({ type: 'droppable', name: 'container' })}
                        type="row"
                        isCombineEnabled={false}>
                        {(provided) => (
                            <div
                                className="w-full min-h-screen"
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

export default EditorPage