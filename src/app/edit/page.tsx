"use client"
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { FaArrowsAlt, FaTrash } from 'react-icons/fa'
import { RiGridLine } from "react-icons/ri"
import { PiLego } from "react-icons/pi"

const elementTypes = [
  { id: 'element-444', text: '4 4 4', elements: 'three-columns' },
  { id: 'element-66', text: '6 6', elements: 'two-columns-equal' },
  { id: 'element-84', text: '8 4', elements: 'two-columns-unequal' },
  { id: 'element-custom', text: 'Custom', elements: 'custom' },
]

const componentTypes = [
  { id: 'component-1', text: 'Component 1' },
  { id: 'component-2', text: 'Component 2' },
]

interface Element {
  id: string;
  text: string;
  elements: string;
  customLayout?: number[];
}

const renderComponent = (el: Element) => {
  switch (el.text) {
    case 'Component 1':
      return <div className="p-2 bg-white border rounded">Component 1</div>
    case 'Component 2':
      return <div className="p-2 bg-white border rounded">Component 2</div>
    default:
      return null
  }
}

const Column: React.FC<{ className?: string, style?: React.CSSProperties, droppableId: string, element: Element }> = ({ className = '', style = {}, droppableId, element }) => (
  <Droppable droppableId={'column-' + droppableId}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`
        flex-1 bg-white border border-gray-300 relative pt-6 rounded-sm overflow-hidden
        before:content-['Column'] before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
        before:font-semibold before:px-2 before:py-1 before:text-gray-500
        before:rounded-br before:border-b before:border-r before:border-gray-200
        ${className}`}
        style={style}
      >
        <p>{JSON.stringify(element)}</p>
        {element && renderComponent(element)}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
)

const HomePage: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([])
  const [customLayout, setCustomLayout] = useState<string>('12')
  const [sidebarTab, setSidebarTab] = useState<'metadata'| 'elements'>('elements')

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    // console.log({ source, destination })
    if (!destination) return

    if (source.droppableId === 'sidebar' && destination.droppableId === 'container') {
      // Add new element to container at the dropped position
      const newElement = elementTypes.find(el => el.id === result.draggableId)
      if (newElement) {
        const newElements = Array.from(elements)
        if (newElement.elements === 'custom') {
          const elements = customLayout.split(' ').map(Number)
          if (elements.reduce((a, b) => a + b, 0) === 12) {
            newElements.splice(destination.index, 0, { ...newElement, id: `${newElement.id}-${elements.length + 1}`, customLayout: elements })
          } else {
            alert('The sum of the numbers must equal 12.')
          }
        } else {
          newElements.splice(destination.index, 0, { ...newElement, id: `${newElement.id}-${elements.length + 1}` })
        }
        setElements(newElements)
      }
    } else if (source.droppableId === 'container' && destination.droppableId === 'container') {
      // Reorder elements within container
      const newElements = Array.from(elements)
      const [movedElement] = newElements.splice(source.index, 1)
      newElements.splice(destination.index, 0, movedElement)
      setElements(newElements)
    }
  }

  const handleDelete = (index: number) => {
    const newElements = Array.from(elements)
    newElements.splice(index, 1)
    setElements(newElements)
  }

  const renderElement = (el: Element) => {
    if (el.elements === 'custom' && el.customLayout) {
      return (
        <div className="flex">
          {el.customLayout.map((width, index) => (
            <Column
              element={el}
              droppableId={el.id}
              key={index}
              style={{ flexBasis: `${(width / 12) * 100}%` }} />
          ))}
        </div>
      )
    }

    switch (el.elements) {
      case 'three-columns':
        return (
          <div className="flex">
            <Column droppableId='1' element={el} />
            <Column droppableId='2' element={el} />
            <Column droppableId='3' element={el} />
          </div>
        )
      case 'two-columns-equal':
        return (
          <div className="flex">
            <Column droppableId='4' element={el} />
            <Column droppableId='5' element={el} />
          </div>
        )
      case 'two-columns-unequal':
        return (
          <div className="flex">
            <Column className="w-2/3" element={el} droppableId='6' />
            <Column className="w-1/3" element={el} droppableId='7' />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className="flex">
        <Droppable droppableId="sidebar" isDropDisabled={true}>
          {(provided) => (
            <aside
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-48 bg-gray-800 text-gray-800"
            >
              <ul className='flex text-white text-[11px] py-3 leading-3 border-b border-gray-600 mb-3'>
                <li
                  onClick={() => setSidebarTab('elements')}
                  className={`px-2 py-1 cursor-pointer hover:font-semibold ${sidebarTab === 'elements' ? 'font-bold' : ''}`}>
                    Elements
                </li>
                <li
                  onClick={() => setSidebarTab('metadata')}
                  className={`px-2 py-1 cursor-pointer hover:font-semibold ${sidebarTab === 'metadata' ? 'font-bold' : ''}`}>
                    Metadata
                </li>
              </ul>
              {sidebarTab === 'elements' && <div className='px-2 text-sm'>
                <section>
                  <h3 className='text-white font-semibold mb-3 flex items-center'>
                    <RiGridLine className='inline-block mr-2'/>
                    <span>Grid system</span>
                  </h3>
                  {elementTypes.map((el, index) => (
                    <Draggable draggableId={el.id} index={index} key={el.id} isDragDisabled={false}>
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-2 mb-2 bg-white rounded border ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'}`}
                        >
                          {el.text === 'Custom' ? (
                            <div className='inline-flex'>
                              <input
                                type="text"
                                value={customLayout}
                                onChange={(e) => setCustomLayout(e.target.value)}
                                placeholder="Enter numbers"
                                className="w-full p-1 border rounded"
                              />
                              <button className='bg-blue-400 pointer-events-none ml-2 rounded-lg text-white p-2 pointer-null text-xs font-semibold'>
                                Grab
                              </button>
                            </div>
                          ) : (
                            el.text
                          )}
                        </div>
                        {snapshot.isDragging && (
                          <div
                            className={`p-2 mb-2 bg-white rounded border ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'}`}
                          >
                            {el.text === 'Custom' ? (
                              <div className='inline-flex'>
                                <input
                                  type="text"
                                  value={customLayout}
                                  placeholder="Enter numbers"
                                  className="w-full p-1 border rounded"
                                  disabled
                                />
                                <button className='bg-blue-400 pointer-events-none ml-2 rounded-lg text-white p-2 pointer-null text-xs font-semibold'>
                                  Grab
                                </button>
                              </div>
                            ) : (
                              el.text
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                  ))}
                </section>
                <section className='mt-6'>
                  <h3 className='text-white font-semibold mb-3 flex items-center'>
                    <PiLego className='inline-block mr-2'/>
                    <span>Components</span>
                  </h3>
                  {componentTypes.map((el, index) => (
                    <Draggable draggableId={el.id} index={index} key={el.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-2 mb-2 bg-white rounded border ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'}`}
                        >
                          {el.text}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </section>
              </div>}
            </aside>
          )}
        </Droppable>
        <Droppable droppableId="container">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex-1 px-3 pt-10 bg-white min-h-screen border rounded-sm border-gray-300 m-2 relative
              before:content-['Container'] before:absolute before:left-0 before:top-0 before:bg-gray-100 before:text-xs
              before:font-semibold before:px-2 before:py-1 before:text-gray-500
              before:rounded-br before:border-r before:border-b before:border-gray-300
              `}
            >
              {elements.map((el, index) => (
                <Draggable key={el.id} draggableId={el.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative p-2 overflow-hidden mb-2 rounded border pt-12 bg-gray-100 border-gray-300 shadow-inner
                      before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
                      before:content-["Row"] before:font-semibold before:px-2 before:py-1 before:text-gray-500
                      before:rounded-br before:border-b before:border-r before:border-gray-300
                      `}
                    >
                      <div className='text-sm font-semibold'>
                        <div className='ml-auto absolute top-2 right-2'>
                          <div className="p-1 bg-sky-400 inline-flex items-center transition rounded text-white hover:bg-blue-500 hover:opacity-100 active:bg-blue-500 active:opacity-100 opacity-30 cursor-grab mr-2" {...provided.dragHandleProps}>
                            <FaArrowsAlt />
                            <span className='ml-1'>Drag</span>
                          </div>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-400 inline-flex items-center hover:bg-red-500 opacity-30 hover:opacity-100 text-white rounded p-1 cursor-pointer"
                          >
                            <FaTrash/>
                            <span className='ml-1'>Delete</span>
                          </button>
                        </div>
                        {renderElement(el)}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </main>
    </DragDropContext>
  )
}

export default HomePage
