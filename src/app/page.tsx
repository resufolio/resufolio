import React from "react"
import page from "../content/home.json"
import PageRenderer from "@/components/pageRenderer/PageRenderer"
import { Section } from "@/components/sectionsRenderer/SectionsRenderer"
import { PageContainer } from "@/components/pageRenderer/PageRenderer"
import { Metadata } from 'next'

const { meta } = page as { meta: Metadata }
export const metadata: Metadata = meta

export default function Home() {
  const { sections, footer, container } = page as {
    sections: Section[],
    footer: Section[],
    container: PageContainer
    meta: Metadata
  }

  return (
    <>
      <PageRenderer
        sections={sections}
        footer={footer}
        container={container}
      />
    </>
  )
}