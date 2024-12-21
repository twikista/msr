'use client'

import { useFormContext } from 'react-hook-form'
import { cn } from '../../../lib/utils'
import { HiOutlineExclamationCircle } from 'react-icons/hi2'

export function TextInput({
  label,
  placeholder,
  name,
  readOnly,
  valueAsNumber,
  valueAsDate,
  type,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]

  return (
    <div className='flex flex-col'>
      <label htmlFor={name} className='inline-block mb-[2px] capitalize'>
        {label}
      </label>
      <div
        className={cn(
          `flex border border-gray-300 rounded-md focus-within:border-2 overflow-hidden bg-white`,
          error && 'border-red-400'
        )}
      >
        <input
          className={cn(
            `w-full text-gray-600 pl-3 inline-block py-2  outline-none appearance-none bg-transparent`,

            type === 'number' &&
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            type === 'date' && 'pr-2'
          )}
          type={type || 'text'}
          {...register(name, {
            valueAsNumber: valueAsNumber ? valueAsNumber : false,
            valueAsDate: valueAsDate ? valueAsDate : false,
          })}
          id={name}
          placeholder={placeholder}
          readOnly={readOnly ? readOnly : null}
        />
        {error && (
          <HiOutlineExclamationCircle
            className={cn('w-5 mr-3', error && 'text-red-400')}
          />
        )}
      </div>

      {error && (
        <span className='text-sm text-red-500 lg:text-base'>
          {error?.message}
        </span>
      )}
    </div>
  )
}
