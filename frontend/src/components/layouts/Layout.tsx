import React from 'react'
import Appbar from '@/components/app-bar/'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Appbar />
      <main>{children}</main>
    </div>
  )
}
