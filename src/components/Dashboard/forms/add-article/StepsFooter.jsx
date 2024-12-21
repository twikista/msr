'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../../../lib/utils'
import CancelButton from '../../buttons/CancelButton'
import SubmitButton from '../../buttons/SubmitButton'

export default function StepsFooter({
  isFirstStep,
  isLastStep,
  handleBack,
  handleNext,
  isSubmitting,
}) {
  return (
    <div className='flex flex-col-reverse justify-end w-full gap-1 sm:gap-3 sm:flex-row md:gap-3'>
      <motion.button
        className={cn(
          'btn bg-neutral-400 min-w-20 hover:bg-neutral-400/80 transition-all duration-300',
          isFirstStep && 'hidden'
        )}
        type='button'
        onClick={handleBack}
      >
        Back
      </motion.button>
      <motion.div>
        <CancelButton
          text='Cancel'
          className={cn(isFirstStep ? 'block' : 'hidden')}
        />
      </motion.div>

      <motion.div layout>
        {isLastStep ? (
          <SubmitButton
            mainText='Create Article'
            altText='Creating article'
            isSubmitting={isSubmitting}
          />
        ) : (
          <button
            type='button'
            className='btn btn-primary min-w-20'
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </motion.div>
    </div>
  )
}
