"use client"
import React, { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import useLocalStorage from '@/hooks/useLocalStorage'
import { RiGridLine } from "react-icons/ri"
import { PiLego } from "react-icons/pi"
import SidebarTitle from '@/components/admin/SidebarTitle'
import SidebarGrids from '@/components/admin//SidebarGrids'
import SidebarComponents from '@/components/admin//SidebarComponents'
import RowSection from '@/components/admin//RowSection'
import { dndId, gridToRow, Row, Grid, ComponentInterface, SidebarTabs } from '@/lib/admin/utils'

const PageEditor: React.FC = () => {
    const [rows, setRows, isLoaded] = useLocalStorage<Row[]>('rows', [])
    const [activeTab, setActiveTab] = useState<SidebarTabs>('elements')
    const grids: Grid[] = [
        { columns: [6, 6] },
        { columns: [4, 4, 4] },
        { columns: [8, 4] },
        { columns: [12] }
    ]

    const handleDeleteRow = (id: string) => {
        setRows(rows.filter(row => row.id !== id))
    }

    const components: ComponentInterface[] = [
        {
            id: '1',
            type: 'Article',
            props: {
                title: 'Article Title',
                content: 'Article Content',
            }
        },
        {
            id: '2',
            type: 'Card',
            props: {
                title: 'Card Title',
                content: 'Card Content',
            }
        }
    ]

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result
        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index) return
        const sourceDroppableId = dndId.parse(source.droppableId)
        const destinationDroppableId = dndId.parse(destination.droppableId)
        const sourceDraggableId = dndId.parse(draggableId)

        if (sourceDroppableId.name === 'sidebar-grids' && destinationDroppableId.name === 'container') {
            const grid: Grid = grids[source.index]
            const row: Row = gridToRow(grid, rows.length)
            setRows([...rows, row])
        } else if (sourceDroppableId.name === 'row' && destinationDroppableId.name === 'row') {
            const newRows = [...rows]
            const [removed] = newRows.splice(source.index, 1)
            newRows.splice(destination.index, 0, removed)
            setRows(newRows)
        } else if (sourceDroppableId.name === 'sidebar-components' && destinationDroppableId.name === 'column') {
            const columnId = destinationDroppableId.columnId
            const rowId = destinationDroppableId.rowId
            const newRows = [...rows]
            const row = newRows.find(row => row.id === rowId)
            if (!row) return
            const column = row.columns.find(column => column.id === columnId)
            if (!column) return
            const component: ComponentInterface | undefined = components.find(component => component.type === sourceDraggableId.componentType)
            if (!component) return
            const newComponents = [...column.components]
            newComponents.splice(destination.index, 0, component)
            column.components = newComponents
            setRows(newRows)
        } else if (sourceDroppableId.name === 'column' && destinationDroppableId.name === 'column') {
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
    }

    if (!isLoaded) {
        return null
    }

    function handleDeleteComponent(id: string): void {
        throw new Error('Function not implemented. ' + id)
    }

    return (
        <>
            <title>Page Wizard: Page Editor</title>
            <div className="bg-slate-900 flex min-h-screen text-sm">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <aside className="w-[210px] py-2 bg-slate-900 top-0 sticky max-h-screen z-20">
                        <ul className="flex text-[0.7rem] border-b border-slate-700 mb-4">
                            {['elements', 'metadata'].map((tab) => (
                                <li
                                    key={tab}
                                    className={`p-2 cursor-pointer capitalize ${activeTab === tab ? 'font-semibold text-white' : 'font-normal text-gray-100'}`}
                                    onClick={() => setActiveTab(tab as SidebarTabs)}>
                                    {tab}
                                </li>
                            ))}
                        </ul>
                        {activeTab === 'elements' && (
                            <>
                                <div className="pl-3 pr-2">
                                    <SidebarTitle title='Grid system' icon={<RiGridLine />} />
                                    <SidebarGrids grids={grids} />
                                </div>
                                <div className="pl-3 pr-2 mt-4">
                                    <SidebarTitle title='Components' icon={<PiLego />} />
                                    <SidebarComponents components={components} />
                                </div>
                            </>
                        )}
                        {activeTab === 'metadata' && (
                            <div className="pl-3 pr-2">
                                <SidebarTitle title='Base' />
                            </div>
                        )}
                    </aside>
                    <main
                        className={`flex-1 px-3 pt-10 bg-white min-h-full border rounded-sm border-gray-300 m-2 relative
                        before:content-['Container'] before:absolute before:left-0 before:top-0 before:bg-gray-100 before:text-xs
                        before:font-semibold before:px-2 before:py-1 before:text-gray-500
                        before:rounded-br before:border-r before:border-b before:border-gray-300`}>
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
                                        <RowSection
                                            key={row.id}
                                            index={index}
                                            {...row}
                                            handleDeleteComponent={handleDeleteComponent}
                                            handleDeleteRow={handleDeleteRow}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </main>
                </DragDropContext>
            </div>
        </>
    )
}

export default PageEditor
