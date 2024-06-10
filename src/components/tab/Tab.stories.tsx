// components/stories/Tab.stories.tsx
import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Tab, { TabProps } from '../tab/Tab'
import { FaHome } from 'react-icons/fa'

export default {
    title: 'Components/Tab',
    component: Tab,
    argTypes: {
        icon: { control: false },
    }
} as Meta

const Template: StoryFn<TabProps> = (args) => <Tab {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Tab Title',
    icon: <FaHome />,
    isActive: false,
}
