'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function FileInput() {
  const [fileName, setFileName] = useState('')
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const fileDetails = watch('pdfFile')
  useEffect(() => {
    if (fileDetails) {
      setFileName(fileDetails[0]?.name)
    }

    // const name = value[0].name
    // console.log(name)
  }, [fileDetails, fileName])
  return (
    <div className='flex flex-col'>
      <div>
        {!fileName ? (
          <input
            id='file-input'
            type='file'
            {...register('pdfFile')}
            accept='application/pdf'
            className={cn(fileName && 'hidden')}
          />
        ) : (
          <div className='flex gap-2'>
            <label
              htmlFor='file-input'
              className='text-gray-500 underline cursor-pointer hover:text-blue-500'
            >
              Change file
            </label>
            <span>{fileName}</span>
          </div>
        )}
      </div>

      {errors && (
        <span className='text-red-500 '>{errors?.pdfFile?.message}</span>
      )}
    </div>
  )
}
