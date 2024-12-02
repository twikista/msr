'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '../shared/inputs/TextInput'
import { PasswordInput } from '../shared/inputs/PasswordInput'
import Link from 'next/link'

export default function SignInForm() {
  const methods = useForm({ defaultValues: { email: '', password: '' } })
  return (
    <FormProvider {...methods}>
      <form className='flex flex-col p-6 shadow-lg w-full max-w-[448px] rounded-xl bg-[#e0e6e2] gap-6 '>
        <h2 className='text-2xl font-semibold uppercase text-secondary'>
          sign in
        </h2>
        <TextInput name='email' label='Email' placeholder='Enter your email' />
        <PasswordInput
          name='password'
          label='password'
          placeholder='Enter your password'
        />
        <div className='flex justify-end'>
          <Link href='#' className='text-sm text-secondary'>
            Forgot password?
          </Link>
        </div>
        <button className='px-4 py-2.5 rounded-lg bg-secondary text-background'>
          Sign in
        </button>
      </form>
    </FormProvider>
  )
}
