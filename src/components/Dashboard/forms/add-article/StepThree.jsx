'use client'
import React, { useState } from 'react'
import TextArea from '../TextArea'
import FileInput from '../FileInput'

export default function StepThree({ hasInitialValue }) {
  return (
    <div className='space-y-4'>
      <TextArea
        label='Abstract'
        name='abstract'
        placeholder='Enter article abstract'
      />
      <FileInput hasInitialValue={hasInitialValue} />
    </div>
  )
}
