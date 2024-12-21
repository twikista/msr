'use client'
import { useForm, useFormContext } from 'react-hook-form'
import { cn } from '../../../lib/utils'
import { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

export function PasswordInput({ label, placeholder, name, labelIcon }) {
  const [inputType, setInputType] = useState('password')
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const handleInputType = () => {
    setInputType((currentType) =>
      currentType === 'password' ? 'text' : 'password'
    )
  }
  const error = errors[name]
  return (
    <div className='flex flex-col w-full gap-0 lg:gap-0'>
      <label
        className={cn('flex items-center py-1 ', labelIcon && 'gap-4')}
        htmlFor={name}
      >
        <span>{label}</span>
        {labelIcon ?? null}
      </label>
      <div className='flex w-full overflow-hidden border rounded-lg focus-within:border-focus-light border-slate-400'>
        <input
          type={inputType}
          className='h-full inline-block  w-full px-3 py-2 max-w-[877px] appearance-none outline-none'
          placeholder={placeholder}
          {...register(name)}
          id={name}
        />

        {inputType === 'password' ? (
          <button
            type='button'
            className='pr-2 bg-white text-[#757575]/70'
            onClick={handleInputType}
          >
            <HiOutlineEyeOff className='text-xl transition-all text-stroke-light dark:text-stroke-dark' />
          </button>
        ) : (
          <button
            type='button'
            className='pr-2 bg-white text-[#757575]/70'
            onClick={handleInputType}
          >
            <HiOutlineEye className='text-xl transition-all cursor-pointer text-stroke-light dark:text-stroke-dark' />
          </button>
        )}
      </div>
      {error && <span className='text-sm text-red-500'>{error?.message}</span>}
    </div>
  )
}
