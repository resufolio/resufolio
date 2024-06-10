// components/stories/Dropdown.stories.tsx
import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Dropdown, { DropdownProps } from '../dropdown/Dropdown'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
}
