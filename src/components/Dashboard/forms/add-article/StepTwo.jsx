'use client'

import React from 'react'
import { TextInput } from '../inputs'
import { motion } from 'framer-motion'
import TagsInput from '../TagsInput'

export default function StepTwo() {
  return (
    <motion.div className='space-y-4'>
      <TextInput
        label='Article Title'
        name='title'
        placeholder='Enter article title'
      />
      <TagsInput
        name='keywords'
        label='Keywords'
        placeholder='Enter article keywords'
      />
      <TagsInput
        name='jelClassifications'
        label='JEL classifications'
        placeholder='Enter JEL classifications'
      />
    </motion.div>
  )
}

// ['title', 'keywords', 'jelClassification']
