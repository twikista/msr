'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IssueFormSchema } from '../../../lib/schema'
import { createIssue, updateIssue } from '../../../lib/actions/issues'
// import CancelButton from './issues/cancel-button'
import { TextInput } from './inputs'
import { handleValidationErrorFromServer } from '../../../lib/helper'
import SubmitButton from '../buttons/SubmitButton'
// import { CancelButton } from '../../shared/inputs/CancelButton'
import CancelButton from '../buttons/CancelButton'
import FormWrapper from './FormWrapper'
import { toast } from 'react-toastify'

export default function IssueForm({ initialFormState, initialValue }) {
  const [errorFromServer, setErrorFromServer] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSucessful, setIsSucessful] = useState(false)
  const router = useRouter()
  const methods = useForm({
    defaultValues: initialFormState,
    resolver: zodResolver(IssueFormSchema),
  })

  console.log('setIsUpdating:', setIsUpdating)

  const onSubmit = async (data) => {
    setIsUpdating(true)
    console.log(data)
    const response =
      initialFormState?.issueNumber === ''
        ? await createIssue(data)
        : await updateIssue(initialValue?._id, initialValue, data)

    // const response = await addIssue(data)
    if (response.ok) {
      setIsUpdating(false)
      toast.success('Issue created successfully')
      router.push('/dashboard/issues?status=draft')
      methods.reset()
    } else {
      toast.error('Issue creaction unsuccessful.')
      if (response?.errorType === 'validationError') {
        const formfields = {
          volume: 'volume',
          issueNumber: 'issueNumber',
          issueYear: 'issueYear',
        }
        handleValidationErrorFromServer(response, formfields, setError)
      }
      if (response?.errorType === 'other') {
        setErrorFromServer(response.error)
      }
    }
  }

  return (
    <FormWrapper
      formHeading={
        !initialFormState?.issueNumber ? 'Add New Issue' : 'Update Issue'
      }
    >
      {errorFromServer && (
        <div>
          <span>{errorFromServer}</span>
        </div>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
          <TextInput
            label='volume number'
            name='volume'
            placeholder='Enter Volume number'
          />
          <TextInput
            label='issue number'
            name='issueNumber'
            placeholder='Enter issue number'
          />
          <TextInput
            type='date'
            label='Issue Date'
            name='issueYear'
            placeholder='Enter issue year'
            valueAsDate={true}
          />
          {/* <input type='submit' value={isSubmitting ? 'submiting...' : 'submit'} /> */}
          {/* <CancelButton href='/dashboard/issues' /> */}
          <div className='flex flex-col-reverse justify-end w-full gap-1 sm:gap-3 sm:flex-row md:gap-3'>
            <CancelButton text='Cancel' />
            <SubmitButton
              mainText='Create Issue'
              altText='Creating issue'
              isSubmitting={methods.formState.isSubmitting}
            />
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  )
}
