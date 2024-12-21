'use client'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { cn } from '../../../lib/utils'
// import { usePathname } from "next/navigation"

export default function EditButton({
  href,
  variant = 'primary',
  disabled = false,
  label = 'Edit',
}) {
  if (variant === 'primary') {
    return (
      <Link
        disabled={disabled}
        // href={href}
        href={href}
        className={cn(
          'rounded-[8px] text-gray-50 flex bg-[#008dcb] hover:bg-blue-600 min-w-[220px] font-medium items-center justify-center gap-2 px-4 capitalize py-2 shadow-md',
          disabled && 'pointer-events-none text-gray-500 bg-gray-200'
        )}
      >
        {variant === 'primary' && <span className=''>{label}</span>}
        <HiOutlinePencilSquare className='size-5' />
      </Link>
    )
  } else {
    return (
      <Link
        href={href}
        disabled={disabled}
        data-tooltip-id='edit'
        data-tooltip-content='Edit'
        data-tooltip-place='top'
        className={cn(
          'flex justify-center text-[#800080] hover:text-blue-600',
          disabled && 'pointer-events-none  text-gray-400'
        )}
      >
        <HiOutlinePencilSquare className='size-6' />
        <Tooltip id='edit' />
      </Link>
    )
  }
}
