'use client'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import StepOne from '../add-article/StepOne'
import StepTwo from '../add-article/StepTwo'
import StepThree from '../add-article/StepThree'
import FormWrapper from '../FormWrapper'
import { motion, AnimatePresence } from 'framer-motion'
import StepsFooter from '../add-article/StepsFooter'
import StepFour from '../add-article/StepFour'
import StepHeader from '../add-article/StepHeader'
import { editArticleFormSchema, newArticleFormSchema } from '@/lib/schema'
import { handleValidationErrorFromServer } from '@/lib/helper'
import { uploadPdfToStorage } from '@/lib/firebase/services'
import { updateArticle } from '@/lib/actions/articles'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const stepFields = {
  stepOne: ['volume', 'issue', 'startPage', 'endPage'],
  stepTwo: ['title', 'keywords', 'jelClassification'],
  stepThree: ['abstract', 'pdfFile'],
  stepFour: ['authors'],
}

const formfields = {
  title: ' title',
  authors: 'authors',
  volume: 'volume',
  issue: 'issue',
  startPage: 'startPage',
  endPage: 'endPage',
  abstract: 'abstract',
  keywords: 'keuwords',
  pdfFile: 'pdfFile',
}

export default function EditArticleForm({ initialValue, params }) {
  const methods = useForm({
    defaultValues: initialValue,
    resolver: zodResolver(editArticleFormSchema),
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [errorFromServer, setErrorFromServer] = useState('')
  const router = useRouter()

  const steps = [
    {
      id: 1,
      component: <StepOne />,
      fields: stepFields['stepOne'],
      label: 'Article Meta data',
    },
    {
      id: 2,
      component: <StepTwo />,
      fields: stepFields['stepTwo'],
      label: 'Article basic information',
    },
    {
      id: 3,
      component: <StepThree hasInitialValue={params.article !== undefined} />,
      fields: stepFields['stepThree'],
      label: 'Article content ',
    },
    {
      id: 4,
      component: <StepFour />,
      fields: stepFields['stepFour'],
      label: 'Article author(s)',
    },
  ]
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === steps.length
  const handleNext = async () => {
    const { fields } = steps[currentStep - 1]
    const isStepValidated = await methods.trigger(fields)
    if (isStepValidated)
      // !isLastStep
      //   ? setCurrentStep((prev) => prev + 1)
      //   : setCurrentStep(steps.length)
      setCurrentStep(Math.min(steps.length, currentStep + 1))
  }
  const handleBack = () => setCurrentStep(Math.max(0, currentStep - 1))

  //submit handler
  const handleFormSubmission = async (data) => {
    let url = null
    //upload article pdf to firebase if pdf is changed by user
    if (data.pdfFile !== null) {
      const response = await removePdfFromStorage(initialValue.pdfUrl)
      url = await uploadPdfToStorage(data)
    }

    //upload formData to server to process and persisit in DB
    const { pdfFile, ...dataWithNoPdfFile } = data
    const response = await updateArticle(
      JSON.parse(JSON.stringify(initialValue)),
      JSON.parse(JSON.stringify(dataWithNoPdfFile)),
      url
    )

    //receive response from server and redirect to appropriate route
    if (response.ok) {
      methods.reset()
      toast.success('Article added sucessfully!!!')
      router.push(`/dashboard/issues/${params?.issue}`)
    } else {
      if (response?.errorType === 'validationError') {
        handleValidationErrorFromServer(response, formfields, setError)
      }
      if (response?.errorType === 'other') {
        setErrorFromServer(response.error)
      }
    }
  }

  return (
    <motion.div>
      <FormWrapper formHeading='Update Article'>
        <StepHeader steps={steps} currentStep={currentStep} />
        {errorFromServer && (
          <div>
            <span>{errorFromServer}</span>
          </div>
        )}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmission)}
            className='mt-5 space-y-6 md:mt-0'
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='flex-grow md:mt-10'
              >
                {steps[currentStep - 1].component}
              </motion.div>
            </AnimatePresence>
            <StepsFooter
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              handleBack={handleBack}
              handleNext={handleNext}
              isSubmitting={methods.formState.isSubmitting}
            />
          </form>
        </FormProvider>
      </FormWrapper>
    </motion.div>
  )
}
