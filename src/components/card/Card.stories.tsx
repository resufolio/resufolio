import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Card, { CardProps } from '../card/Card'
import { FaStar } from 'react-icons/fa'

export default {
  title: 'Components/Card',
  component: Card,
} as Meta

const Template: StoryFn<CardProps> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  image: {
    src: 'https://via.placeholder.com/600x400',
    alt: 'Placeholder Image',
    width: 600,
    height: 400,
  },
  title: 'Card Title',
  icon: <FaStar className="text-yellow-500" />,
  text: 'This is a short description for the card.',
  tags: ['Tag1', 'Tag2', 'Tag3'],
}
