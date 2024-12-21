'use client'
import { useForm, useFormContext } from 'react-hook-form'
import { cn } from '../../../lib/utils'

export function TextInput({ label, placeholder, name, labelIcon }) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
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
      <div className='flex w-full gap-4 overflow-hidden border rounded-lg focus-within:border-focus-light border-slate-400'>
        <input
          type='text'
          className='h-full inline-block  w-full px-3 py-2 max-w-[877px] appearance-none outline-none'
          placeholder={placeholder}
          {...register(name)}
          id={name}
        />
      </div>
      {error && <span className='text-sm text-red-500'>{error?.message}</span>}
    </div>
  )
}
