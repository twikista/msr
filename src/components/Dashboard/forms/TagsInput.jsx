'use client'
import React, { useState, useCallback } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { GoPlus } from 'react-icons/go'
import { cn } from '@/lib/utils'

const Tag = React.memo(({ tag, onRemove }) => (
  <div className='flex gap-1 px-2 py-1 text-gray-600 bg-gray-200 border border-gray-200 border-solid rounded-lg w-fit'>
    <span>{tag}</span>
    <button
      type='button'
      onClick={onRemove}
      className='flex items-center justify-center '
    >
      <IoIosCloseCircleOutline className='text-lg text-red-400 transition-all duration-200 hover:fill-red-500' />
    </button>
  </div>
))

Tag.displayName = 'Tag'

export default function TagsInput({ label, name, placeholder, defaultValue }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()
  const [inputValue, setInputValue] = useState('')
  const error = errors[name]

  const addTag = useCallback(
    (currentTags) => {
      const tag = inputValue.trim()
      if (tag && !currentTags.includes(tag)) {
        setValue(name, [...currentTags, tag])
        setInputValue('')
      }
    },
    [inputValue, name, setValue]
  )

  const handleKeyDown = useCallback(
    (event, currentTags) => {
      if (event.key === ',') {
        event.preventDefault()
        addTag(currentTags)
      }
    },
    [addTag]
  )

  const handleRemoveTag = useCallback(
    (index, currentTags) => {
      const updatedTags = currentTags.filter((_, i) => i !== index)
      setValue(name, updatedTags)
    },
    [name, setValue]
  )

  return (
    <div>
      <label
        className={cn(
          'flex flex-col px-2 py-2 lg:flex-row lg:items-center lg:justify-between lg:px-0 lg:py-3'
        )}
      >
        <span>{label}</span>
        <div className='flex items-center gap-1'>
          {/* <IoMdInformationCircleOutline className='text-lg text-primary-light dark:text-primary-dark' /> */}
          <span className='text-xs text-textSecondary-light dark:text-textSecondary-dark'>
            Press comma &#39; &#44; &#39; or click Add to add a tag
          </span>
        </div>
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || []}
        render={({ field: { value = [] } }) => (
          <>
            <div>
              <div
                className={cn(
                  'flex gap-1 overflow-hidden bg-white border border-gray-300 rounded-md focus-within:border-2',
                  error && 'border-red-400'
                )}
              >
                <input
                  type='text'
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, value)}
                  className='flex-1 inline-block py-2 pl-3 text-gray-600 outline-none appearance-none'
                />
                <button
                  type='button'
                  onClick={() => addTag(value)}
                  disabled={!inputValue.trim()}
                  className='text-gray-600 transition-colors duration-200 bg-gray-300 rounded-l-none rounded-r-sm cursor-pointer hover:bg-neutral-300 btn btn-create w-fit'
                >
                  <GoPlus className='text-lg' />
                  Add
                </button>
              </div>
              {error && <span className='text-red-500 '>{error?.message}</span>}
            </div>

            <div
              className={cn(
                value.length && 'flex flex-wrap gap-2 mt-1 py-1 rounded-md'
              )}
            >
              {value.map((tag, index) => (
                <Tag
                  key={`${tag}-${index}`}
                  tag={tag}
                  onRemove={() => handleRemoveTag(index, value)}
                />
              ))}
            </div>
          </>
        )}
      />
    </div>
  )
}
