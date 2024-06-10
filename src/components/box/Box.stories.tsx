// components/stories/Box.stories.tsx
import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Box, { BoxProps } from '../box/Box'

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    centered: { control: 'boolean' },
  },
} as Meta

const Template: StoryFn<BoxProps> = (args) => <Box {...args} />

export const Default = Template.bind({})
Default.args = {
  centered: false,
  children: <div>Content inside the box</div>,
}

export const Centered = Template.bind({})
Centered.args = {
  centered: true,
  children: <div>Centered content inside the box</div>,
}
