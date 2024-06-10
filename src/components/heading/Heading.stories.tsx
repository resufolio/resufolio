import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Heading, { HeadingProps } from './Heading'

export default {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    level: {
      control: { type: 'select', options: [1, 2, 3, 4, 5, 6] },
    },
    text: { control: 'text' },
    link: {
      control: {
        type: 'object',
        properties: {
          text: { control: 'text' },
          href: { control: 'text' },
        },
      },
    },
  },
} as Meta

const Template: StoryFn<HeadingProps> = (args) => <Heading {...args} />

export const Level1 = Template.bind({})
Level1.args = {
  level: 1,
  text: 'Heading Level 1',
}

export const Level2 = Template.bind({})
Level2.args = {
  level: 2,
  text: 'Heading Level 2',
}

export const WithLink = Template.bind({})
WithLink.args = {
  level: 3,
  text: 'Heading with Link',
  link: {
    text: 'Read More',
    href: '/link',
  },
}
