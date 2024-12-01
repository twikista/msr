import React from 'react'
import Main from '../../../components/shared/Main'
import { H1 } from '../../../components/shared/headings'

export default function Current() {
  return (
    <Main>
      <H1>Current</H1>
      <div className='flex items-center justify-center h-full'>
        <span className='text-lg text-gray-500 md:text-2xl'>
          Articles will be upload soon.
        </span>
      </div>
    </Main>
  )
}
