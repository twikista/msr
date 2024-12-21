'use client'
import React from 'react'
import { TextInput } from '../inputs'
import { motion } from 'framer-motion'

export default function StepOne() {
  return (
    <motion.div className='space-y-4'>
      <TextInput
        label='volume number'
        name='volume'
        placeholder='Enter volume number'
        readOnly={true}
      />
      <TextInput
        label='issue number'
        name='issue'
        placeholder='Enter issue number'
        readOnly={true}
      />
      <TextInput
        label='Article Start Page'
        name='startPage'
        placeholder='Enter article start page'
        valueAsNumber={true}
      />
      <TextInput
        label='Article End Page'
        name='endPage'
        placeholder='Enter article end page'
        valueAsNumber={true}
      />
    </motion.div>
  )
}
