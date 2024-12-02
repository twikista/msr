import React from 'react'
import SignInForm from '../../../components/forms/SignInForm'

export default function Login() {
  return (
    <section className='flex flex-col items-center justify-center w-full gap-8 mt-16 mb-20'>
      <div className='flex flex-col items-center gap-2'>
        <h3 className='text-3xl font-bold'>Welcome back</h3>
        <span className='text-sm text-[#757575]'>
          Sign in to your account to continue
        </span>
      </div>
      <SignInForm />
    </section>
  )
}
