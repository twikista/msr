import { auth } from '../../../../auth'
import SideNavItems from './SideNavItems'
import LogoutButton from './LogoutButton'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

export default async function SideNav() {
  const session = await auth()
  const user = session.user
  return (
    <nav className='hidden lg:flex flex-col h-screen overflow-y-hidden border-r text-white border-gray-300 border-solid w-60 bg-secondary shadow-[0px_1px_4px_rgba(0 0 0 0.16)] sticky top-0 bottom-0 left-0 font-barlow'>
      <div className='flex flex-col items-center'>
        <div className='flex items-center flex-1 gap-2 pt-5 pb-3 text-white'>
          <HiOutlineDesktopComputer className='size-6' />
          <span className='text-xl font-bold uppercase '>Admin Panel</span>
        </div>
        <div className='h-[1px] bg-[#d1cbde] w-4/5 mx-auto' />
      </div>
      <nav className='flex-1 pt-6 px-7'>
        <SideNavItems session={user} />
      </nav>
      <div className='flex flex-col items-center h-20'>
        <div className='h-[1px] bg-[#d1cbde] w-4/5' />
        <LogoutButton />
      </div>
    </nav>
  )
}
