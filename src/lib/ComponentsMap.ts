import React from 'react'

const ComponentsMap: Record<string, React.ElementType> = {
  Article: React.lazy(() => import('../components/article/Article')),
  Billboard: React.lazy(() => import('../components/billboard/Billboard')),
  Box: React.lazy(() => import('../components/box/Box')),
  Button: React.lazy(() => import('../components/button/Button')),
  Card: React.lazy(() => import('../components/card/Card')),
  Cards: React.lazy(() => import('../components/cards/Cards')),
  FlatList: React.lazy(() => import('../components/flatList/FlatList')),
  Heading: React.lazy(() => import('../components/heading/Heading')),
  Hero: React.lazy(() => import('../components/hero/Hero')),
  IconsBox: React.lazy(() => import('../components/iconsBox/IconsBox')),
  InlineLinks: React.lazy(() => import('../components/inlineLinks/InlineLinks')),
  Image: React.lazy(() => import('../components/imageComponent/ImageComponent')),
  LinkClouds: React.lazy(() => import('../components/linkClouds/LinkClouds')),
  Panel: React.lazy(() => import('../components/panel/Panel')),
  Pill: React.lazy(() => import('../components/pill/Pill')),
  PillList: React.lazy(() => import('../components/pillList/PillList')),
  Prose: React.lazy(() => import('../components/prose/Prose')),
  Ruler: React.lazy(() => import('../components/ruler/Ruler')),
  Tab: React.lazy(() => import('../components/tab/Tab')),
  TabList: React.lazy(() => import('../components/tabList/TabList')),
  Tag: React.lazy(() => import('../components/tag/Tag')),
  TagList: React.lazy(() => import('../components/tagList/TagList')),
}

export default ComponentsMap