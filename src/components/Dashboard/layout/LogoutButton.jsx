'use client'
import { logOut } from '../../../lib/actions/auth'
import { cn } from '../../../lib/utils'
import { HiOutlineArrowLeftStartOnRectangle } from 'react-icons/hi2'

function LogoutButton({ variant }) {
  if (variant === 'mobile') {
    return (
      <form action={logOut} className='flex lg:hidden '>
        <button
          type='submit'
          className='flex flex-col items-center justify-center text-gray-50'
        >
          <HiOutlineArrowLeftStartOnRectangle className={cn('w-5')} />
          <span className='text-xs'>Log out</span>
        </button>
      </form>
    )
  }
  return (
    <form action={logOut} className='flex items-center flex-1 w-full px-7'>
      <div className='flex items-center justify-center w-full text-gray-100 transition-all duration-300 border cursor-pointer border-gray-100/60 rounded-2xl hover:bg-gray-100/80 hover:border-0 hover:text-foreground'>
        <button
          type='submit'
          className='flex items-center gap-3 px-3 py-3 text-lg'
        >
          <HiOutlineArrowLeftStartOnRectangle className={cn('w-5')} />
          <span>Log out</span>
        </button>
      </div>
    </form>
  )
}

export default LogoutButton
