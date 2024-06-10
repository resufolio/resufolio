import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Pill, { PillProps } from '../pill/Pill'
import { FaStar } from 'react-icons/fa'

export default {
  title: 'Components/Pill',
  component: Pill  
} as Meta

const Template: StoryFn<PillProps> = (args) => <Pill {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Pill Label',
  icon: <FaStar className="text-yellow-500" />,
}
