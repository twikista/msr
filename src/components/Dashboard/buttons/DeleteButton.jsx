'use client'

import { useState } from 'react'
import { cn } from '../../../lib/utils'
import Spinner from '../../shared/Spinner'
import { HiOutlineTrash } from 'react-icons/hi2'
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify'

export default function DeleteButton({
  action,
  id,
  variant = 'primary',
  label = 'Delete',
  altLabel,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const handler = async (id) => {
    setIsLoading(true)
    const response = await action(id)
    if (response?.ok) {
      setIsLoading(false)
      toast.success('Issue deleted successfully!')
    } else {
      setIsLoading(false)
      toast.success('Something went wrong. Try again.')
    }
  }

  if (variant === 'primary') {
    return (
      <button
        type='button'
        disabled={isLoading}
        onClick={() => handler(id)}
        className={cn(
          'w-full shadow-md flex gap-1 btn btn-danger',
          isLoading && 'pointer-events-none text-gray-500 bg-gray-200'
        )}
      >
        {variant === 'primary' && (
          <>
            <span className='capitalize'>{isLoading ? altLabel : label}</span>
            {isLoading ? (
              <Spinner variant='basic' />
            ) : (
              <HiOutlineTrash className='size-5' />
            )}
          </>
        )}
      </button>
    )
  } else {
    return (
      <button
        type='button'
        disabled={isLoading}
        onClick={() => handler(id)}
        className={cn(
          'text-[#800080] hover:text-red-500',
          isLoading && 'pointer-events-none text-gray-400'
        )}
        data-tooltip-id='delete'
        data-tooltip-content='Delete!'
        data-tooltip-place='top'
      >
        {isLoading ? (
          <Spinner variant='basic' />
        ) : (
          <HiOutlineTrash className='size-6' />
        )}
        <Tooltip id='delete' />
      </button>
    )
  }
}
