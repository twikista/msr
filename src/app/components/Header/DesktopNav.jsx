'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { TiArrowSortedDown } from 'react-icons/ti'
import { cn } from '../../../lib/utils'

function SubMenu({ subMenuItems, showSubMenu, setShowSubMenu }) {
  const closeSubMenu = () => {
    showSubMenu && setShowSubMenu(false)
  }
  return (
    <ul className='absolute flex flex-col text-[15px] text-white bg-secondary top-[25px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)]'>
      {subMenuItems.map((menuItem) => (
        <li
          key={menuItem.pathName}
          className={` py-2 px-3 min-w-[45px] transition-all duration-200 hover:bg-gray-200/30 hobe [&:not(:last-child)]:border-b-[1px] border-secondary group/item cursor-pointer ${
            showSubMenu ? 'block' : 'hidden'
          }`}
          onClick={closeSubMenu}
        >
          <Link
            href={menuItem.url}
            className='capitalize w-full group-hover/item:translate-x-1.5 transition-all ease-linear duration-200 inline-block'
          >
            {menuItem.pathName}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function MenuItem({ menuItem }) {
  const [showSubMenu, setShowSubMenu] = useState(false)
  const pathname = usePathname()
  const handler = () => {
    setShowSubMenu(!showSubMenu)
  }

  const activeSubMenu = (menuItem) =>
    menuItem.subMenuItems.some((i) => i.url === pathname)

  const active = (path, href) => path === href

  return (
    <li
      key={menuItem.pathName}
      className={cn('group/item')}
      onMouseEnter={() => setShowSubMenu(true)}
      onMouseLeave={() => setShowSubMenu(false)}
    >
      {menuItem.subMenuItems ? (
        <>
          <button
            type='button'
            className={cn(
              'flex items-center justify-center gap-1 capitalize w-fit px-3 rounded-md py-1 transition-all duration-300 group-hover/item:text-yellow-400',
              activeSubMenu(menuItem) && 'bg-[#f8fbf8]/30 shadow-sm'
            )}
            aria-haspopup='menu'
            aria-expanded={showSubMenu ? 'true' : 'false'}
            onClick={handler}
          >
            {menuItem.pathName}
            {/* </Link> */}
            <TiArrowSortedDown />
          </button>
          {
            <SubMenu
              subMenuItems={menuItem.subMenuItems}
              showSubMenu={showSubMenu}
              setShowSubMenu={setShowSubMenu}
            />
          }
        </>
      ) : (
        <Link
          href={`${menuItem.url}`}
          className={cn(
            'text-base flex items-center justify-center capitalize w-fit px-3 rounded-md py-1 transition-all group-hover/item:text-yellow-400 duration-300',
            active(pathname, menuItem.url) && 'bg-[#f8fbf8]/30 shadow-sm'
          )}
        >
          {menuItem.pathName}
        </Link>
      )}
    </li>
  )
}

export function DesktopNav({ menuItems }) {
  const [hang, setHang] = useState(false)
  //   const [showSubMenu, setShowSubMenu] = useState(false)

  const scrollCon = () => {
    if (window.scrollY < 60) {
      setHang(false)
    } else {
      setHang(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollCon)
    return () => window.removeEventListener('scroll', scrollCon)
  }, [])

  return (
    <nav
      className={`bg-secondary justify-center hidden md:flex px-2 ${
        hang ? 'fixed top-0 right-0 left-0 z-50' : null
      }`}
    >
      <ul className='relative flex items-center justify-between w-fit gap-6 py-1 text-[15px] font-medium text-white font-barlow'>
        {menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.pathName}
            menuItem={menuItem}
            // showSubMenu={showSubMenu}
            // setShowSubMenu={setShowSubMenu}
          />
        ))}
      </ul>
    </nav>
  )
}
