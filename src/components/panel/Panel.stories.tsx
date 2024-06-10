import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Panel from './Panel'

export default {
  title: 'Components/Panel',
  component: Panel,
} as Meta

const Template: StoryFn = (args) => <Panel char={''} title={''} {...args} />

export const Default = Template.bind({})
Default.args = {
    char: '🐝',
    title: 'Welcome to the hive!',
}