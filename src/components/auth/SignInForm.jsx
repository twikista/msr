'use client'

import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '../shared/inputs/TextInput'
import { PasswordInput } from '../shared/inputs/PasswordInput'
import Link from 'next/link'
import SubmitButton from '../shared/inputs/SubmitButton'
import { signinFormSchema } from '../../lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import DisplayServerValidationError from '../../components/ServerValidationError'
import { login } from '../../lib/actions/auth'

export default function SignInForm() {
  const methods = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signinFormSchema),
  })

  const [authError, setAuthError] = useState(null)

  const handler = async (data) => {
    const response = await login(data)

    if (response && response?.errorType === 'validationError') {
      const fieldErrorMapping = {
        email: 'email',
        password: 'password',
      }
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => response?.errors[field]
      )
      if (fieldWithError) {
        // Use the ValidFieldNames type to ensure the correct field names
        const errors = Object.keys(response.errors)
        errors.forEach((error) =>
          setError(error, { type: 'server', message: response.errors[error] })
        )
      }
    } else if (response?.errorType === 'authError') {
      setAuthError(response.error)
    }
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handler)}
        className='flex flex-col p-6 shadow-lg w-full max-w-[448px] rounded-xl bg-[#e0e6e2] gap-6 '
      >
        <h2 className='text-2xl font-semibold uppercase text-secondary'>
          sign in
        </h2>
        {authError && (
          <DisplayServerValidationError
            error={authError}
            setError={setAuthError}
          />
        )}
        <TextInput name='email' label='Email' placeholder='Enter your email' />
        <PasswordInput
          name='password'
          label='Password'
          placeholder='Enter your password'
        />
        <div className='flex justify-end'>
          <Link href='#' className='text-sm text-secondary'>
            Forgot password?
          </Link>
        </div>
        <SubmitButton
          mainText='Sign in'
          altText='Signing in...'
          isSubmitting={methods.formState.isSubmitting}
          className='md:w-full py-2.5 hover:bg-hover '
        />
      </form>
    </FormProvider>
  )
}
