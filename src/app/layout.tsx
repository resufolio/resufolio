"use client"
import { Inter } from "next/font/google"
import "./globals.css"
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'
import { ResufolioConfigs } from "@/lib/resufolio/ResufolioConfigs.types"
import Configs from '@/.resufolio.config.json'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  const gtmId = Configs.gtmId as ResufolioConfigs['gtmId']

  useEffect(() => {
    gtmId && TagManager.initialize({ gtmId })
  }, [gtmId])

  return (
    <LayoutContent>
      {children}
    </LayoutContent>
  )
}

const LayoutContent: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const inline = `(function() {
    // Change these if you use something different in your hook.
    var storageKey = 'darkMode'
    var classNameDark = 'dark'
    var classNameLight = 'light'
    function setClassOnDocumentBody(darkMode) {
      document.body.classList.add(darkMode ? classNameDark : classNameLight)
      document.body.classList.remove(darkMode ? classNameLight : classNameDark)
    }
    var preferDarkQuery = '(prefers-color-scheme: dark)'
    var mql = window.matchMedia(preferDarkQuery)
    var supportsColorSchemeQuery = mql.media === preferDarkQuery
    var localStorageTheme = null
    try {
      localStorageTheme = localStorage.getItem(storageKey)
    } catch (err) {
      // Intentionally empty catch block
    }
    var localStorageExists = localStorageTheme !== null
    if (localStorageExists) {
      localStorageTheme = JSON.parse(localStorageTheme)
    }
    // Determine the source of truth
    if (localStorageExists) {
      // source of truth from localStorage
      setClassOnDocumentBody(localStorageTheme)
    } else if (supportsColorSchemeQuery) {
      // source of truth from system
      setClassOnDocumentBody(mql.matches)
      localStorage.setItem(storageKey, mql.matches)
    } else {
      // source of truth from document.body
      var isDarkMode = document.body.classList.contains(classNameDark)
      localStorage.setItem(storageKey, JSON.stringify(isDarkMode))
    }
  })()`
  return (
    <html lang="en">
      <body className={inter.className + ' bg-white dark:bg-slate-800'}>
        <script dangerouslySetInnerHTML={{ __html: inline }} />
        {children}
      </body>
    </html>
  )
}