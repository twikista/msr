'use client'

import {
  RiHomeFill,
  RiHomeLine,
  RiNewsFill,
  RiNewsLine,
  RiStackFill,
  RiStackLine,
} from 'react-icons/ri'
import { HiOutlineUsers, HiUsers } from 'react-icons/hi'
import { HiCog6Tooth, HiOutlineCog6Tooth } from 'react-icons/hi2'

import MobileNavItem from './MobileNavItem'
import LogoutButton from './LogoutButton'

const sideNavMenuItems = [
  {
    text: 'Home',
    url: '/dashboard',
    outlineIcon: RiHomeLine,
    fillIcon: RiHomeFill,
  },
  {
    text: 'Issues',
    url: '/dashboard/issues',
    outlineIcon: RiStackLine,
    fillIcon: RiStackFill,
  },
  {
    text: 'News',
    url: '/dashboard/announcements',
    outlineIcon: RiNewsLine,
    fillIcon: RiNewsFill,
  },
  {
    text: 'Editors',
    url: '/dashboard/editorial-board',
    outlineIcon: HiOutlineUsers,
    fillIcon: HiUsers,
  },
]

function MobileNavItems({ session }) {
  return (
    <ul className='flex items-center justify-between w-full md:w-4/5 md:mx-auto'>
      {sideNavMenuItems.map(({ url, text, fillIcon, outlineIcon }) => (
        <MobileNavItem
          key={text}
          url={url}
          linkText={text}
          OutlineIcon={outlineIcon}
          FillIcon={fillIcon}
        />
      ))}
      {session?.user?.role === 'admin' && (
        <>
          <MobileNavItem
            url='/dashboard/manage-users'
            linkText='users'
            OutlineIcon={HiOutlineCog6Tooth}
            FillIcon={HiCog6Tooth}
          />
        </>
      )}
      <LogoutButton variant='mobile' />
    </ul>
  )
}

export default MobileNavItems
