'use client'
import React from 'react'
import { cn } from '../../../lib/utils'

function FormWrapper({ children, formHeading, className }) {
  return (
    <div className='flex justify-center w-full'>
      <section
        className={cn(
          `w-full max-w-[620px] mx-auto my-5 overflow-hidden rounded-md px-2 pb-3 bg-gray-50 border border-gray-300 pt-5 md:px-7`,
          className
        )}
      >
        <h2 className='px-5 py-2 pb-10 text-xl font-medium text-center text-secondary md:text-2xl'>
          {formHeading}
        </h2>
        <>{children}</>
      </section>
    </div>
  )
}

export default FormWrapper
