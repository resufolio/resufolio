import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { 
      action: 'clicked'},
  },
} as Meta

const Template: StoryFn = (args) => <Button label={''} {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Primary Button',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled Button',
  disabled: true,
}
