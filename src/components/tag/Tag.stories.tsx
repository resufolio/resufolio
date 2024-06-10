import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Tag, { TagProps } from '../tag/Tag'

export default {
  title: 'Components/Tag',
  component: Tag,
} as Meta

const Template: StoryFn<TagProps> = (args) => <Tag {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Example Tag',
}
