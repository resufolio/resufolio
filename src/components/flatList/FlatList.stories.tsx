import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import FlatList from './FlatList'

export default {
  title: 'Components/FlatList',
  component: FlatList,
} as Meta

const Template: StoryFn<{ title: string; items: string[]; ordered: boolean }> = (args) => <FlatList {...args} />

export const UnorderedList = Template.bind({})
UnorderedList.args = {
  title: 'Unordered List',
  items: [
    'First item',
    'Second item with **bold** text',
    'Third item with *italic* text',
    'Fourth item with [a link](https://example.com)',
  ],
  ordered: false,
}

export const OrderedList = Template.bind({})
OrderedList.args = {
  title: 'Ordered List',
  items: [
    'First item',
    'Second item with **bold** text',
    'Third item with *italic* text',
    'Fourth item with [a link](https://example.com)',
  ],
  ordered: true,
}
