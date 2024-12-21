'use client'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CgMathPlus } from 'react-icons/cg'
import { HiOutlineExclamationCircle, HiOutlineXMark } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'
import { cn } from '@/lib/utils'

export default function AuthorsInput() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'authors' })
  const error = errors['authors']
  return (
    <fieldset
      className={cn(``, {
        // ['border border-gray-300']: fields.length > 1,
      })}
    >
      {/*  */}
      <div>
        <div className='space-y-6'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={cn(
                fields.length > 1 &&
                  'p-2 bg-gray-100 border border-gray-200 rounded-lg'
              )}
            >
              {fields.length > 1 && (
                <div className='flex items-center gap-1 mb-1'>
                  <span className='font-medium'>{`Author-${index + 1}`}</span>
                  <button
                    type='button'
                    data-tooltip-id='delete-author'
                    data-tooltip-content={`Remove Author-${index + 1}`}
                    data-tooltip-place='top'
                    onClick={() => remove(index)}
                    className='flex items-center justify-center w-4 h-4 p-[1px] text-red-500 bg-transparent border border-red-500 rounded-[4px] hover:bg-red-500 hover:text-white'
                  >
                    <HiOutlineXMark className='w-3' />
                    <Tooltip id='delete-author' />
                  </button>
                </div>
              )}
              <div className='flex flex-col'>
                <div className='flex flex-col'>
                  <label htmlFor='name' className='inline-block mb-1'>
                    {fields.length > 1 ? 'Name' : 'Author Name'}
                  </label>
                  <div
                    className={cn(
                      'flex border border-gray-300 rounded-md focus-within:border-2 overflow-hidden bg-white',
                      error && 'border-red-400'
                    )}
                  >
                    <input
                      className={cn(
                        `w-full text-gray-600 pl-3 inline-block py-2  outline-none appearance-none`
                      )}
                      type='text'
                      {...register(`authors.${index}.name`)}
                      id='name'
                      placeholder="Enter Author's name (Surname First)"
                    />
                    {error && (
                      <HiOutlineExclamationCircle
                        className={cn('w-5 mr-3', error && 'text-red-400')}
                      />
                    )}
                  </div>

                  {error && (
                    <span className='text-red-500 '>
                      {error?.[index]?.name?.message}
                    </span>
                  )}
                </div>
                {/* author affliation - department */}
                <div className='flex flex-col mt-2'>
                  <label htmlFor='department' className='inline-block mb-1 '>
                    {fields.length > 1 ? 'Department' : 'Author Department'}
                  </label>
                  <div
                    className={cn(
                      'flex border border-gray-300 rounded-md focus-within:border-2 overflow-hidden bg-white',
                      error && 'border-red-400'
                    )}
                  >
                    <input
                      className={cn(
                        `w-full text-gray-600 pl-3 inline-block py-2  outline-none appearance-none`
                      )}
                      type='text'
                      {...register(`authors.${index}.department`)}
                      id='department'
                      placeholder="Enter Author's Department"
                    />
                    {error && (
                      <HiOutlineExclamationCircle
                        className={cn('w-5 mr-3', error && 'text-red-400')}
                      />
                    )}
                  </div>

                  {error && (
                    <span className='text-red-500 '>
                      {error?.[index]?.department?.message}
                    </span>
                  )}
                </div>
                {/* author affliation - institution */}
                <div className='flex flex-col mt-2'>
                  <label htmlFor='institution' className='inline-block mb-1 '>
                    {fields.length > 1 ? 'Institution' : 'Author Institution'}
                  </label>
                  <div
                    className={cn(
                      'flex border border-gray-300 rounded-md focus-within:border-2 overflow-hidden bg-white',
                      error && 'border-red-400'
                    )}
                  >
                    <input
                      className={cn(
                        `w-full text-gray-600 pl-3 inline-block py-2  outline-none appearance-none`
                      )}
                      type='text'
                      {...register(`authors.${index}.institution`)}
                      id='institution'
                      placeholder="Enter Author's Institution"
                    />
                    {error && (
                      <HiOutlineExclamationCircle
                        className={cn('w-5 mr-3', error && 'text-red-400')}
                      />
                    )}
                  </div>

                  {error && (
                    <span className='text-red-500 '>
                      {error?.[index]?.institution?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-end mt-[8px]'>
          <button
            type='button'
            className=' flex gap-[2px] rounded-[4px] px-2 text-gray-600 transition-colors duration-200 bg-gray-300 py-1 items-center justify-center hover:bg-neutral-300 '
            onClick={() => append({ name: '', affliation: '', orchidId: '' })}
          >
            <CgMathPlus className='w-4 fill-current' />
            <span>Add Author</span>
          </button>
        </div>
      </div>
    </fieldset>
  )
}
