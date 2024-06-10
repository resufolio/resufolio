import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Hero, { HeroProps } from './Hero'

export default {
  title: 'Components/Hero',
  component: Hero,
  argTypes: {
    markdownText: { control: 'text' },
  },
} as Meta

const Template: StoryFn<HeroProps> = (args) => <Hero {...args} />

export const Default = Template.bind({})
Default.args = {
  image: {
    src: 'https://via.placeholder.com/600x400',
    alt: 'Placeholder Image',
    width: 600,
    height: 400,
  },
  markdownText: `# Hero Title

This is a paragraph with **bold** text and *italic* text.

- Item 1
- Item 2
- Item 3`,
}
