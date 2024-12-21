import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

export default function LayoutWrapper({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-grow w-full min-h-full mx-auto sm:px-4 max-w-7xl'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
