"use client"

import React, { useState } from 'react'
import Tab from '../tab/Tab'
import ComponentsMap from '@/lib/ComponentsMap'

interface ComponentProps {
  type: string;
  props: Record<string, unknown>;
}

interface TabData {
  title: string;
  icon?: React.ReactNode;
  components: ComponentProps[];
}

export interface TabListProps {
  tabs: TabData[];
  overflowMobile?: boolean;
}

const TabList: React.FC<TabListProps> = ({ tabs, overflowMobile = true }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className='w-full'>
      <div className='overflow-x-auto'>
        <div className="flex border-b border-gray-200 dark:border-slate-700 min-w-max">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              title={tab.title}
              icon={tab.icon}
              isActive={activeTab === index}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
      </div>
      <div className={`p-4 ${overflowMobile ? 'overflow-x-auto' : ''}`}>
        {tabs[activeTab].components.map((component, index) => {
          const Component = ComponentsMap[component.type]
          return <Component key={index} {...component.props} />
        })}
      </div>
    </div>
  )
}

export default TabList
