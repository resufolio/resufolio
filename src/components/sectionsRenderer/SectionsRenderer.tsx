import React from 'react'
import ComponentsMap from '@/lib/ComponentsMap'
import Columns, { ColumnWidth } from '@/lib/Columns'

interface ComponentProps {
  type: string;
  props: Record<string, unknown>;
}

interface Column {
  width?: ColumnWidth;
  components: ComponentProps[];
}

export type Sizes = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface SectionContainer {
  top?: Sizes;
  bottom?: Sizes;
  fullWidth?: boolean;
}

export interface Section {
  container?: SectionContainer;
  columns: Column[];
}

interface SectionsRendererProps {
  sections: Section[];
}

const SectionsRenderer: React.FC<SectionsRendererProps> = ({ sections }) => {

  const sizesBottomMap: Record<Sizes, string> = {
    'none': '',
    'xs': 'mb-4 md:mb-8',
    'sm': 'mb-8 md:mb-12',
    'md': 'mb-12 md:mb-16',
    'lg': 'mb-16 md:mb-20',
    'xl': 'mb-20 md:mb-32'
  }

  const sizesTopMap: Record<Sizes, string> = {
    'none': '',
    'xs': 'mt-4 md:mt-8',
    'sm': 'mt-8 md:mt-12',
    'md': 'mt-12 md:mt-16',
    'lg': 'mt-16 md:mt-20',
    'xl': 'mt-18 md:mt-32'
  }

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className={`mx-auto ${sizesBottomMap[section?.container?.bottom ?? 'none']} flex flex-col md:flex-row flex-wrap border-box ${sizesTopMap[section?.container?.top ?? 'none']} ${section.container?.fullWidth ? 'w-full' : 'container max-w-[1200px] px-6'}`}>
          {section.columns.map((column, columnIndex) => (
            <div key={columnIndex} className={`${Columns[column.width ?? 'full']} ${section.container?.fullWidth ? '' : 'pb-4 pr-4 md:pb-6 md:pr-6'} flex flex-col`}>
              {column.components.map((component, componentIndex) => {
                const Component = ComponentsMap[component.type]
                return Component ? (
                  <Component key={componentIndex} {...component.props} />
                ) : null
              })}
            </div>
          ))}
        </section>
      ))}
    </>
  )
}

export default SectionsRenderer
