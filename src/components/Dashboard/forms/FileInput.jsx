'use client'
import { articleFileName } from '@/lib/helper'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

function ToggleFileInputField({
  hasInitialValue,
  hideFileInput,
  setHideFileInput,
  setValue,
}) {
  const clickHandler = () => {
    setHideFileInput(!hideFileInput)
    if (hasInitialValue && !hideFileInput) {
      setValue('pdfFile', null)
    }
  }
  return (
    <>
      <button onClick={clickHandler} className='text-blue-500 hover:underline'>
        {hasInitialValue && hideFileInput ? 'change file' : 'cancel'}
      </button>
    </>
  )
}

export default function FileInput({ hasInitialValue }) {
  const [fileName, setFileName] = useState('')
  const [hideFileInput, setHideFileInput] = useState(true)
  const {
    register,
    watch,
    getValues,
    setValue,
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
    <>
      {hasInitialValue ? (
        <div>
          {hasInitialValue && hideFileInput && (
            <div>
              <span className='text-gray-400'>
                Article pdf:&nbsp;
                <Link
                  className='underline underline-offset-2 hover:text-blue-500'
                  href={getValues('pdfUrl')}
                  target='_blank'
                >
                  {articleFileName(getValues())}
                </Link>
              </span>
              &nbsp; &#124; &nbsp;
              <ToggleFileInputField
                hasInitialValue={hasInitialValue}
                hideFileInput={hideFileInput}
                setHideFileInput={setHideFileInput}
                setValue={setValue}
              />
            </div>
          )}
          {!hideFileInput && (
            <input
              type='file'
              {...register('pdfFile')}
              accept='application/pdf'
              // name='pdfFile'
              // className={clsx({
              //   hidden: hasInitialValue && hideFileInput,
              // })}
            />
          )}
          {hasInitialValue && !hideFileInput && (
            <ToggleFileInputField
              hasInitialValue={hasInitialValue}
              hideFileInput={hideFileInput}
              setHideFileInput={setHideFileInput}
              setValue={setValue}
            />
          )}
          {errors && <div>{errors?.pdfFile?.message}</div>}
        </div>
      ) : (
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
              <div className='flex'>
                <span>{fileName}</span>
                &nbsp; &#124; &nbsp;
                <label
                  htmlFor='file-input'
                  className='text-blue-500 cursor-pointer hover:underline'
                >
                  change file
                </label>
              </div>
            )}
          </div>

          {errors && (
            <span className='text-red-500 '>{errors?.pdfFile?.message}</span>
          )}
        </div>
      )}
    </>
  )
}
