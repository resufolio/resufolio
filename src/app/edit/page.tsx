"use client"
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { FaArrowsAlt, FaTrash } from 'react-icons/fa'

const elementTypes = [
  { id: 'element-444', text: '4 4 4', layout: 'three-columns' },
  { id: 'element-66', text: '6 6', layout: 'two-columns-equal' },
  { id: 'element-84', text: '8 4', layout: 'two-columns-unequal' },
  { id: 'element-custom', text: 'Custom', layout: 'custom' },
]

interface Element {
  id: string;
  text: string;
  layout: string;
  customLayout?: number[];
}

const Column: React.FC<{ children: React.ReactNode, className?: string, style?: React.CSSProperties }> = ({ children, className = '', style = {} }) => (
  <div className={`
    flex-1 bg-white border border-gray-300 relative pt-6 rounded-sm overflow-hidden
    before:content-['Column'] before:absolute before:left-0 before:top-0 before:bg-gray-50 before:text-xs
    before:font-semibold before:px-2 before:py-1 before:text-gray-500
    before:rounded-br before:border-b before:border-r before:border-gray-200
    ${className}`
    }
    style={style}
    >
    <div className='p-2'>
      {children}
    </div>
  </div>
)

const HomePage: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([])
  const [customLayout, setCustomLayout] = useState<string>('')

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    if (source.droppableId === 'sidebar' && destination.droppableId === 'container') {
      // Add new element to container at the dropped position
      const newElement = elementTypes.find(el => el.id === result.draggableId)
      if (newElement) {
        const newElements = Array.from(elements)
        if (newElement.layout === 'custom') {
          const layout = customLayout.split(' ').map(Number)
          if (layout.reduce((a, b) => a + b, 0) === 12) {
            newElements.splice(destination.index, 0, { ...newElement, id: `${newElement.id}-${elements.length + 1}`, customLayout: layout })
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
    if (el.layout === 'custom' && el.customLayout) {
      return (
        <div className="flex">
          {el.customLayout.map((width, index) => (
            <Column key={index} style={{ flexBasis: `${(width / 12) * 100}%` }}>
              Column {index + 1}
            </Column>
          ))}
        </div>
      )
    }

    switch (el.layout) {
      case 'three-columns':
        return (
          <div className="flex">
            <Column>Column 1</Column>
            <Column>Column 2</Column>
            <Column>Column 3</Column>
          </div>
        )
      case 'two-columns-equal':
        return (
          <div className="flex">
            <Column>Column 1</Column>
            <Column>Column 2</Column>
          </div>
        )
      case 'two-columns-unequal':
        return (
          <div className="flex">
            <Column className="w-2/3">Column 1</Column>
            <Column className="w-1/3">Column 2</Column>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <Droppable droppableId="sidebar" isDropDisabled={true}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-48 p-5 bg-slate-800 text-slate-800"
            >
              <section>
                <h3 className='text-white font-semibold mb-3'>Grid system</h3>
                {elementTypes.map((el, index) => (
                  <Draggable draggableId={el.id} index={index} key={el.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-2 mb-2 bg-white rounded border ${snapshot.isDragging ? 'opacity-50' : 'opacity-100'}`}
                      >
                        {el.text === 'Custom' ? (
                          <input
                            type="text"
                            value={customLayout}
                            onChange={(e) => setCustomLayout(e.target.value)}
                            placeholder="Enter numbers"
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          el.text
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
              </section>
              <section className='mt-6'>
                <h3 className='text-white font-semibold mb-3'>Components</h3>
                <div className="p-2 mb-2 bg-white rounded border">Component 1</div>
                <div className="p-2 mb-2 bg-white rounded border">Component 2</div>
              </section>
            </div>
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
                            className="bg-red-400 inline-flex items-center hover:bg-red-500 opacity-30 hover:opacity-100 text-white rounded p-1"
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
      </div>
    </DragDropContext>
  )
}

export default HomePage
