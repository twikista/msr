import React from 'react'
import Main from '../../../../components/shared/Main'
import { H1 } from '../../../../components/shared/headings'
import LayoutWrapper from '../../../../components/shared/LayoutWrapper'

export default function Archive() {
  return (
    <LayoutWrapper>
      <Main>
        <H1>Archive</H1>
        <div className='flex items-center justify-center h-full'>
          <span className='text-lg text-gray-500 md:text-2xl'>
            Issues will be uploaded soon.
          </span>
        </div>
      </Main>
    </LayoutWrapper>
  )
}
