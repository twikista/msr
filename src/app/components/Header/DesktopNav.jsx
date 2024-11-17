'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { TiArrowSortedDown } from 'react-icons/ti'
import { menuItems } from '@/static/menuItems'

function SubMenu({ subMenuItems, showSubMenu, setShowSubMenu }) {
  // console.log(subMenuItems)
  const closeSubMenu = () => {
    showSubMenu && setShowSubMenu(false)
  }
  return (
    <ul className='absolute flex flex-col text-[15px] text-white bg-secondary top-[28px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)]'>
      {subMenuItems.map((menuItem) => (
        <li
          key={menuItem.pathName}
          className={` py-2 px-3 min-w-[45px] hover:text-secondary hover:bg-gray-200 hobe [&:not(:last-child)]:border-b-[1px] border-secondary ${
            showSubMenu ? 'block' : 'hidden'
          }`}
          onClick={closeSubMenu}
        >
          <Link
            href={menuItem.url}
            className='capitalize hover:translate-x-1.5 transition-all ease-linear duration-400 inline-block'
          >
            {menuItem.pathName}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function MenuItem({ menuItem }) {
  // console.log(menuItem)
  const [showSubMenu, setShowSubMenu] = useState(false)
  const currentRoute = usePathname()
  // console.log(currentRoute)
  const handler = () => {
    setShowSubMenu(!showSubMenu)
  }
  return (
    <li
      key={menuItem.pathName}
      className={`flex items-center `}
      onMouseEnter={() => setShowSubMenu(true)}
      onMouseLeave={() => setShowSubMenu(false)}
    >
      {menuItem.subMenuItems ? (
        <>
          <button
            type='button'
            className='flex items-center gap-1 capitalize w-fit'
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
        <Link href={`${menuItem.url}`} className='text-base capitalize'>
          {menuItem.pathName}
        </Link>
      )}
    </li>
  )
}

export function DesktopNav({ menuItems }) {
  console.log(menuItems)
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
