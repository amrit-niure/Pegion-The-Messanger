'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import {SessionProvider} from 'next-auth/react'
const Providers = ({ children }) => {
    return (
      <div>
      <ThemeProvider attribute='class'>
      <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </div>
  )
}
export default Providers