"use client"
import React from "react"
import SectionsRenderer, { Section, Sizes } from "@/components/sectionsRenderer/SectionsRenderer"
import Header from "@/components/header/Header"
import { Breadcrumb } from "@/lib/breadcrumbs/Breadcrumbs.types"

export interface PageContainer {
  bottom?: Sizes;
  top?: Sizes;
}

interface PageRendererProps {
  sections: Section[];
  footer: Section[];
  container: PageContainer;
  breadcrumbs?: Breadcrumb[];
}

const PageRenderer: React.FC<PageRendererProps> = ({ sections, footer, container, breadcrumbs }) => {

  const containerToClass: Record<Sizes, string> = {
    'none': '',
    'xs': 'py-4 md:py-8',
    'sm': 'py-8 md:py-12',
    'md': 'py-10 md:py-20',
    'lg': 'py-16 md:py-24',
    'xl': 'py-20 md:py-32'
  }

  return (
    <div className={`bg-white dark:bg-slate-900`}>
      <Header breadcrumbs={breadcrumbs} />
      <main className={`min-h-screen m-auto bg-white dark:bg-slate-900 ${container?.bottom ? containerToClass[container.bottom] : ''} ${container?.top ? containerToClass[container.top] : ''}`}>
        <SectionsRenderer sections={sections} />
      </main>
      <footer className="container max-w-[1200px] m-auto pt-10 pb-5 border-t border-gray-200 dark:border-slate-600">
        <SectionsRenderer sections={footer} />
      </footer>
    </div>
  )
}

export default PageRenderer