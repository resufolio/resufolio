"use strict"
"use client"

import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"
import { FaArrowsAlt, FaTrash } from "react-icons/fa"
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

/**
* DraggableButton component.
*
* @param children - The content to be rendered inside the button.
*/
const DraggableButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="p-2 mb-2 bg-white rounded border inline-flex w-full items-center">
        <span className="mr-2 w-full">{children}</span>
        <span className={`transition bg-blue-400 hover:bg-blue-500 ml-auto text-white p-1 font-semibold text-xs rounded-sm`}>drag</span>
        </div>
    )
}

interface Column {
  width: number
  components?: Record<string, any>[]
}

interface Row {
  columns: Column[]
}

interface SectionRowProps extends Row {
  id: string
  handleDelete: (id: string) => void
}

/**
 * Represents a column component.
 *
 * @component
 * @param {string} droppableId - The ID of the droppable area.
 * @param {number} width - The width of the column (default is 12).
 * @returns {JSX.Element} The column component.
 */
const Column: React.FC<{ droppableId: string, width: number }> = ({ droppableId, width = 12 }) => (
    <Droppable droppableId={'column-' + droppableId}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                bg-white border border-gray-300 relative pt-6 rounded-sm overflow-hidden
                before:content-['Column'] before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
                before:font-semibold before:px-2 before:py-1 before:text-gray-500
                before:rounded-br before:border-b before:border-r before:border-gray-200
                ${widthClassMap[width]}`}>
                <div
                    className={`border border-dashed border-gray-200 m-2 rounded-lg transition ${snapshot.isDraggingOver ? 'opacity-100' : 'opacity-0'}`}>
                    {provided.placeholder}
                </div>
            </div>
        )}
    </Droppable>
)

/**
 * Represents a section row component.
 *
 * @component
 * @param {SectionRowProps} props - The props for the SectionRow component.
 * @param {Column[]} props.columns - The array of columns to render within the section row.
 * @param {string} props.id - The ID of the section row.
 * @param {Function} props.handleDelete - The function to call when the delete button is clicked.
 * @returns {JSX.Element} The rendered SectionRow component.
 */
const SectionRow: React.FC<SectionRowProps> = ({ columns, id, handleDelete }) => {
    return (
        <Draggable key={id} draggableId={id.toString()} index={Number(id)}>
        {(provided) => (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}>
            <section className={`relative p-2 overflow-hidden mb-1 rounded border pt-12 bg-gray-100 border-gray-300 shadow-inner
                before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
                before:content-["Row"] before:font-semibold before:px-2 before:py-1 before:text-gray-500
                before:rounded-br before:border-b before:border-r before:border-gray-300`}>
                <div className='ml-auto absolute top-2 right-2 text-xs'>
                    <div className="p-1 bg-sky-400 inline-flex items-center transition rounded text-white hover:bg-blue-500 hover:opacity-100 active:bg-blue-500 active:opacity-100 opacity-30 cursor-grab mr-2" {...provided.dragHandleProps}>
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
            <div className="flex">
                {columns.map((column, index) => (
                    <Column key={index} droppableId={`column-${id}-${index}`} width={column.width} />
                ))}
            </div>
            </section>
        </div>
        )}
        </Draggable>
    )
}

/**
* Represents the Editor Page component.
* This component is responsible for rendering the editor page, including the sidebar and main content.
*/
const EditorPage: React.FC = () => {
    const sidebarTabs = [{ name: 'Metadata', key: 'metadata' }, { name: 'Elements', key: 'elements' }] as const
    const [sidebarTab, setSidebarTab] = useState<typeof sidebarTabs[number]['key']>('elements')
    const [rows, setRows] = useState<Row[]>([])

    const grids = [
        { columns: [4, 4, 4] },
        { columns: [6, 6] },
        { columns: [8, 4] }
    ]

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const { source, destination } = result
        console.log({ source, destination })
        if (source.droppableId === 'grid' && destination.droppableId === 'container') {
            const grid = grids[source.index]
            const row = { id: rows.length.toString(), columns: grid.columns.map(width => ({ width })) }
            setRows([...rows, row])
        } else if (source.droppableId === 'container' && destination.droppableId === 'container') {
            const newRows = [...rows]
            const [removed] = newRows.splice(source.index, 1)
            newRows.splice(destination.index, 0, removed)
            setRows(newRows)
        } //else if (source.droppableId === 'container' && destination.droppableId.startsWith('column')) {
            //alert('It should not be possible to drag rows into columns.')
        //}
    }

    return (
        <>
        <title>Page Editor</title>
        <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex min-h-screen">
        <aside className="w-48 min-w-48 bg-gray-800 text-gray-800 sticky top-0 max-h-screen overflow-y-auto">
        <ul className='flex text-white text-[11px] py-3 leading-3 border-b border-gray-600 mb-3'>
        {sidebarTabs.map(tab => (
            <li
            key={tab.key}
            onClick={() => setSidebarTab(tab.key)}
            className={`px-2 py-1 cursor-pointer hover:font-semibold ${sidebarTab === tab.key ? 'font-bold' : ''}`}>
            {tab.name}
            </li>
        ))}
        </ul>
        {sidebarTab === 'metadata' && (
            <div>
            <h2>Metadata</h2>
            </div>
        )}
        {sidebarTab === 'elements' && (
            <>
            <section className="px-2 text-sm">
            <SidebarTitle title='Grid system' icon={<RiGridLine/>} />
            <Droppable droppableId="grid" isDropDisabled={true}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                {grids.map((grid, index) => (
                    <Draggable draggableId={`grid-${index}`} index={index} key={`grid-${index}`}>
                    {(provided, snapshot) => (
                        <div className="text-sm">
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                            <DraggableButton>
                            <div className="flex flex-1 items-center">
                            {grid.columns.map((width, index) => (
                                <span key={index} className={`${widthClassMap[width]} bg-gray-100 indent-1 border border-gray-300 rounded-sm`}>
                                {width}
                                </span>
                            ))}
                            </div>
                            </DraggableButton>
                            </div>
                            {snapshot.isDragging && (
                                <DraggableButton>
                                    <div className="flex flex-1">
                                    {grid.columns.map((width, index) => (
                                        <span key={index} className={`${widthClassMap[width]} bg-gray-100 indent-1 border border-gray-300 rounded-sm opacity-30`}>
                                        {width}
                                        </span>
                                    ))}
                                    </div>
                                </DraggableButton>
                            )}
                        </div>
                    )}
                    </Draggable>
                ))}
                <span className="hidden">{provided.placeholder}</span>
                </div>
            )}
            </Droppable>
            </section>
            <section className="px-2 text-sm mt-4">
                <SidebarTitle title='Components' icon={<PiLego />} />
                <Droppable droppableId="components" isDropDisabled={true}>
                {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Draggable draggableId={'component'} index={0} key={'component'}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                        <DraggableButton>Component</DraggableButton>
                        </div>
                    )}
                    </Draggable>
                    {provided.placeholder}
                </div>
                )}
                </Droppable>
            </section>
            </>
        )}
        </aside>
        <main className="bg-slate-800 flex-1 w-full">
        <Droppable droppableId="container">
            {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex-1 px-3 pt-10 bg-white min-h-full border rounded-sm border-gray-300 m-2 relative
                before:content-['Container'] before:absolute before:left-0 before:top-0 before:bg-gray-100 before:text-xs
                before:font-semibold before:px-2 before:py-1 before:text-gray-500
                before:rounded-br before:border-r before:border-b before:border-gray-300
                `}>
                {rows.map((row, index) => (
                    <SectionRow
                        key={index} id={index.toString()} handleDelete={(id) => setRows(rows.filter(row => row.id !== id))}
                        columns={row.columns}
                    />
                ))}
                {provided.placeholder}
            </div>
            )}
        </Droppable>
        </main>
        </div>
        </DragDropContext>
        </>
    )
}

export default EditorPage