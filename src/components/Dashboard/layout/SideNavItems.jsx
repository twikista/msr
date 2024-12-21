'use client'

import SideNavItem from './SideNavItem'
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

const sideNavItems = [
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
function SideNavItems({ session }) {
  return (
    <ul className='space-y-4'>
      {sideNavItems.map((navItem) => (
        <SideNavItem
          key={navItem.url}
          linkText={navItem.text}
          link={navItem.url}
          OutlineIcon={navItem.outlineIcon}
          FillIcon={navItem.fillIcon}
        />
      ))}
      {session?.role === 'system-admin' && (
        <>
          <SideNavItem
            type='link'
            linkText='Settings'
            link='/dashboard/settings'
            OutlineIcon={HiOutlineCog6Tooth}
            FillIcon={HiCog6Tooth}
          />
        </>
      )}
    </ul>
  )
}

export default SideNavItems
