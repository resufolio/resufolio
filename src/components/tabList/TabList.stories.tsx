import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import TabList, { TabListProps } from '../tabList/TabList'
import { FaHome, FaInfo, FaUser } from 'react-icons/fa'

export default {
  title: 'Components/TabList',
  component: TabList,
} as Meta

const Template: StoryFn<TabListProps> = (args) => <TabList {...args} />

export const Default = Template.bind({})
Default.args = {
  tabs: [
    {
      title: 'Home',
      icon: <FaHome />,
      components: []
    },
    {
      title: 'About',
      icon: <FaInfo />,
      components: []
    },
    {
      title: 'Profile',
      icon: <FaUser />,
      components: []
    },
  ],
}